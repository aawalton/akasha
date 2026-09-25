import { createHash } from "node:crypto"
import type { Adding, Replacing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { textOf } from "akasha/code/body/modules/body-text/body-text.module.code.ts"
import { resourcesIn } from "akasha/infrastructure/cluster/k8s-type/modules/container-resources/container-resources.module.code.ts"
import type { WorkloadClass } from "akasha/infrastructure/cluster/k8s-type/modules/hostnames/hostnames.module.code.ts"
import {
  type CodeSync,
  type Env,
  manifestsOf,
  type Stated,
} from "akasha/infrastructure/service/akasha-service/service-cluster/modules/workload-writing/workload-writing.module.code.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"
import { secretAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shadowFor } from "akasha/page/modules/shadow/shadow.module.code.ts"
import {
  numberAt,
  recordsIn,
  slugsUnder,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const SERVICE_CLUSTER = "service-cluster"

const WEB_APP = "web-app"

const SECRET = "secret"

const MANIFESTS = "manifests"

const DEPLOYMENT = "Deployment"

const TAGGED = /:[^/]+$/

const WORKLOAD_CLASSES: readonly WorkloadClass[] = [
  "control",
  "database",
  "build",
  "serve",
  "workers",
  "ci",
  "eso-rig",
]

const TURNS_UNDER = ["infrastructure/service/akasha-service/", "infrastructure/cluster/k8s-type/"]

type Written = {
  readonly edits: readonly (Adding | Replacing)[]
  readonly said: readonly string[]
}

const NOTHING_WRITTEN: Written = { edits: [], said: [] }

export function secretChecksumOf(sealed: ReadonlyMap<string, string>): string {
  const summed = [...sealed.entries()].sort((one, other) => one[0].localeCompare(other[0]))
  return createHash("md5").update(JSON.stringify(summed)).digest("hex")
}

function envIn(value: Value): readonly Env[] {
  const found: Env[] = []
  for (const one of recordsIn(value.runtimeEnv)) {
    const name = textAt(one, "name")
    if (name === null) continue
    const stated = textAt(one, "value")
    if (stated !== null) {
      found.push({ name, value: stated })
      continue
    }
    const from = recordsIn(one.fromSecret)[0]
    const resource = from === undefined ? null : textAt(from, "resourceName")
    const key = from === undefined ? null : textAt(from, "resourceKey")
    if (resource === null || key === null) continue
    found.push({ name, valueFrom: { secretKeyRef: { name: resource, key } } })
  }
  return found
}

function codeSyncIn(value: Value): CodeSync | null {
  const held = recordsIn(value.codeSync)[0]
  if (held === undefined) return null
  const cachePath = textAt(held, "cachePath")
  const minMemoryMb = numberAt(held, "minMemoryMb")
  const killMemoryMb = numberAt(held, "killMemoryMb")
  if (cachePath === null || minMemoryMb === null || killMemoryMb === null) return null
  return { cachePath, minMemoryMb, killMemoryMb }
}

function workloadClassIn(value: Value): WorkloadClass | null {
  const said = textAt(value, "workloadClass")
  return WORKLOAD_CLASSES.find((one) => one === said) ?? null
}

function webAppNaming(shadow: Shadow, slug: string): Value | null {
  for (const listed of shadow.index.everyOfType(WEB_APP)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    if (slugsUnder(value.serviceClusters, `${SERVICE_CLUSTER}/`).includes(slug)) return value
  }
  return null
}

function sealedInto(change: Change, shadow: Shadow, resource: string): ReadonlyMap<string, string> {
  const sealed = new Map<string, string>()
  for (const listed of shadow.index.everyOfType(SECRET)) {
    const value = shadow.pageOf(listed.path)
    if (value === null) continue
    for (const placement of recordsIn(value.placements)) {
      if (textAt(placement, "resourceName") !== resource) continue
      const key = textAt(placement, "resourceKey")
      const sidecar = secretAt(listed.path)
      const body = sidecar === null ? null : textOf(change.after(sidecar))
      if (key === null || body === null) continue
      sealed.set(key, body)
    }
  }
  return sealed
}

type Found = { readonly stated: Stated } | { readonly missing: string }

function statedFor(change: Change, shadow: Shadow, value: Value): Found {
  const slug = textAt(value, "slug") ?? ""
  if (textAt(value, "resourceKind") !== DEPLOYMENT) {
    return {
      missing: `\`${slug}\` is no ${DEPLOYMENT}, and only a web app's ${DEPLOYMENT} is written`,
    }
  }
  const image = textAt(value, "image")
  const codeSync = codeSyncIn(value)
  if (image === null) return { missing: `\`${slug}\` states no image` }
  if (codeSync === null && TAGGED.test(image)) {
    return {
      missing: `\`${slug}\` states no image repository without a tag, the tag being the deploy's`,
    }
  }
  const namespace = textAt(value, "namespace")
  const resourceName = textAt(value, "resourceName")
  const replicas = numberAt(value, "replicas")
  const containerPort = numberAt(value, "containerPort")
  const probePath = textAt(value, "probePath")
  const workloadClass = workloadClassIn(value)
  if (
    namespace === null ||
    resourceName === null ||
    replicas === null ||
    containerPort === null ||
    probePath === null ||
    workloadClass === null
  ) {
    return {
      missing: `\`${slug}\` states no namespace, resource name, replicas, container port, probe path or workload class`,
    }
  }
  const webApp = webAppNaming(shadow, slug)
  if (webApp === null) return { missing: `no web app names \`${SERVICE_CLUSTER}/${slug}\`` }
  const sourceDirectory = textAt(webApp, "sourceDirectory")
  const secretResource = textAt(webApp, "secretResource")
  if (sourceDirectory === null || secretResource === null) {
    return {
      missing: `the web app naming \`${slug}\` states no source directory or secret resource`,
    }
  }
  const sealed = sealedInto(change, shadow, secretResource)
  if (sealed.size === 0) {
    return {
      missing: `no secret page places a value into \`${secretResource}\`, so nothing says what its checksum is over`,
    }
  }
  return {
    stated: {
      image,
      namespace,
      resourceName,
      replicas,
      containerPort,
      workloadClass,
      probePath,
      instance: textAt(value, "instanceLabel") ?? namespace,
      ownsNamespace: value.ownsNamespace === true,
      sourceDirectory,
      secretResource,
      secretChecksum: secretChecksumOf(sealed),
      env: envIn(value),
      resources: resourcesIn(value),
      codeSync,
    },
  }
}

function writtenAt(
  change: Change,
  shadow: Shadow,
  reading: Reading,
  path: string,
  value: Value
): Written {
  const found = statedFor(change, shadow, value)
  if ("missing" in found)
    return { edits: [], said: [`no manifests were written — ${found.missing}`] }
  const at = fileOf(reading, { path, value }, SERVICE_CLUSTER, MANIFESTS)
  const written = manifestsOf(found.stated)
  const was = textOf(change.after(at))
  if (was === written) return NOTHING_WRITTEN
  return {
    edits: [
      was === null
        ? { kind: "add", path: at, content: written }
        : { kind: "replace", path: at, contentFrom: was, contentTo: written },
    ],
    said: [`\`${at}\` was written again from its cluster service's and web app's pages`],
  }
}

function writtenOver(change: Change, shadow: Shadow, reading: Reading): Written {
  const edits: (Adding | Replacing)[] = []
  const said: string[] = []
  for (const listed of shadow.index.everyOfType(SERVICE_CLUSTER)) {
    const value = shadow.pageOf(listed.path)
    if (value === null || textAt(value, MANIFESTS) === null) continue
    const got = writtenAt(change, shadow, reading, listed.path, value)
    edits.push(...got.edits)
    said.push(...got.said)
  }
  return { edits, said }
}

export function couldTurn(change: Change): boolean {
  return change.changed.some((path) => TURNS_UNDER.some((under) => path.startsWith(under)))
}

export function generateChange(change: Change): Written {
  try {
    if (!couldTurn(change)) return NOTHING_WRITTEN
    const cast = shadowFor(change)
    if ("refused" in cast)
      return { edits: [], said: [`no manifests were written — ${cast.refused}`] }
    return writtenOver(change, cast.shadow, cast.reading)
  } catch (thrown) {
    return {
      edits: [],
      said: [
        `no manifests were written — ${thrown instanceof Error ? thrown.message : String(thrown)}`,
      ],
    }
  }
}
