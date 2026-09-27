import { join, relative } from "node:path"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textThere } from "akasha/file/system/modules/text-there/text-there.module.code.ts"
import { discoverSynthFiles } from "akasha/infrastructure/cluster/k8s-synth/modules/synth-discovery/synth-discovery.module.code.ts"
import { loadSynthOutputs } from "akasha/infrastructure/cluster/k8s-synth/modules/synth-loading/synth-loading.module.code.ts"
import { NAMESPACE_NAMES } from "akasha/infrastructure/cluster/manifest/app-namespaces-synth/app-namespaces-synth.manifest.code.ts"
import {
  AUDITED_KINDS,
  type LiveResource,
  listLive,
} from "akasha/infrastructure/cluster/manifest/modules/orphan-resource-listing/orphan-resource-listing.module.code.ts"
import {
  deployableNamed,
  WEB_APP_TYPE,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/web-app-reading/web-app-reading.module.code.ts"
import {
  readingIn,
  slugsOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { parseAllDocuments } from "yaml"

const MANAGED_BY_A_DEPLOY: ReadonlySet<string> = new Set(["deploy-script", "bootstrap"])

const ALLOWED_ORPHANS: ReadonlySet<string> = new Set<string>()

const AUDITED_KIND_NAMES: ReadonlySet<string> = new Set<string>(AUDITED_KINDS)

function resourceKey(kind: string, namespace: string, name: string): string {
  return `${kind}/${namespace}/${name}`
}

function keyOfManifest(body: unknown): string | null {
  if (!isRecord(body)) return null
  const kind = body.kind
  if (typeof kind !== "string") return null
  if (!AUDITED_KIND_NAMES.has(kind)) return null
  const metadata = isRecord(body.metadata) ? body.metadata : null
  if (metadata === null) return null
  const name = metadata.name
  const namespace = metadata.namespace
  if (typeof name !== "string" || typeof namespace !== "string") return null
  return resourceKey(kind, namespace, name)
}

function keysIn(yaml: string, keys: Set<string>): undefined {
  for (const document of parseAllDocuments(yaml)) {
    const key = keyOfManifest(document.toJS())
    if (key !== null) keys.add(key)
  }
}

export function webAppSourceKeys(root: string): ReadonlySet<string> {
  const pages = readingIn(root)
  const keys = new Set<string>()
  for (const slug of slugsOfType(pages, WEB_APP_TYPE)) {
    const read = deployableNamed(pages, slug)
    if ("refused" in read) continue
    const at = read.deployable.manifestsPath
    if (at === null) continue
    const held = textThere(join(root, at))
    if (held === null) {
      throw new Error(
        `${at} holds no manifests, so what the deploy of \`${slug}\` applies cannot be told apart from an orphan`
      )
    }
    keysIn(held, keys)
  }
  return keys
}

async function sourceKeys(root: string): Promise<ReadonlySet<string>> {
  const synthPaths = discoverSynthFiles(root)
  if (synthPaths.length === 0) {
    throw new Error(
      `no synth source is under ${root}, so every live resource would read as an orphan`
    )
  }
  const keys = new Set<string>(webAppSourceKeys(root))
  for (const synthPath of synthPaths) {
    let entries: readonly { readonly name: string; readonly yaml: string }[]
    try {
      entries = await loadSynthOutputs(synthPath)
    } catch (err) {
      throw new Error(
        `${relative(root, synthPath)} would not synthesise, so what it deploys cannot be told ` +
          `apart from an orphan: ${err instanceof Error ? err.message : String(err)}`
      )
    }
    for (const entry of entries) keysIn(entry.yaml, keys)
  }
  return keys
}

function orphansAmong(
  keys: ReadonlySet<string>,
  live: readonly LiveResource[]
): readonly LiveResource[] {
  return live.filter((one) => {
    if (one.managedBy === null) return false
    if (!MANAGED_BY_A_DEPLOY.has(one.managedBy)) return false
    const key = resourceKey(one.kind, one.namespace, one.name)
    return !keys.has(key) && !ALLOWED_ORPHANS.has(key)
  })
}

interface Sweep {
  readonly namespaces: readonly string[]
  readonly sourceCount: number
  readonly liveCount: number
  readonly orphans: readonly LiveResource[]
}

export async function sweepOrphanedResources(deadlineMs: number): Promise<Sweep> {
  const keys = await sourceKeys(akashaRoot())
  const namespaces: readonly string[] = NAMESPACE_NAMES
  const live: LiveResource[] = []
  for (const namespace of namespaces) {
    for (const kind of AUDITED_KINDS) {
      live.push(...(await listLive(namespace, kind, deadlineMs)))
    }
  }
  return {
    namespaces,
    sourceCount: keys.size,
    liveCount: live.length,
    orphans: orphansAmong(keys, live),
  }
}
