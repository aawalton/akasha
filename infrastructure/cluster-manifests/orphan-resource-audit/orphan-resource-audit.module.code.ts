import { relative } from "node:path"
import { discoverSynthFiles } from "@akasha/k8s-synth/synth-discovery"
import { loadSynthOutputs } from "@akasha/k8s-synth/synth-loading"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { parseAllDocuments } from "yaml"
import { NAMESPACE_NAMES } from "../app-namespaces-synth/app-namespaces-synth.module.code.ts"
import {
  AUDITED_KINDS,
  type LiveResource,
  listLive,
} from "../orphan-resource-listing/orphan-resource-listing.module.code.ts"

export const MANAGED_BY_A_DEPLOY: ReadonlySet<string> = new Set(["deploy-script", "bootstrap"])

export const ALLOWED_ORPHANS: ReadonlySet<string> = new Set<string>()

const AUDITED_KIND_NAMES: ReadonlySet<string> = new Set<string>(AUDITED_KINDS)

export function resourceKey(kind: string, namespace: string, name: string): string {
  return `${kind}/${namespace}/${name}`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function keyOfManifest(body: unknown): string | null {
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

export async function sourceKeys(root: string): Promise<ReadonlySet<string>> {
  const synthPaths = discoverSynthFiles(root)
  if (synthPaths.length === 0) {
    throw new Error(
      `no synth source stands under ${root}, so every live resource would read as an orphan`
    )
  }
  const keys = new Set<string>()
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
    for (const entry of entries) {
      for (const document of parseAllDocuments(entry.yaml)) {
        const key = keyOfManifest(document.toJS())
        if (key !== null) keys.add(key)
      }
    }
  }
  return keys
}

export function orphansAmong(
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

export interface Sweep {
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
