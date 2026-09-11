import { everyOfType, listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"
import type { Systemd } from "akasha/services/workstations/properties/systemd.record-property.types.ts"
import {
  commandsOf,
  type Refused,
  startsIn,
} from "akasha/services/workstations/run-composing/run-composing.module.code.ts"
import type {
  Service,
  Started,
} from "akasha/services/workstations/unit-writing/unit-writing.module.code.ts"

export const SERVICE_PAGE_TYPE = "service-workstation"

const SYSTEMD_TEXT_KEYS = ["restart", "schedule", "partOf", "wantedBy"] as const
const SYSTEMD_NUMBER_KEYS = [
  "restartDelaySeconds",
  "startTimeoutSeconds",
  "jitterSeconds",
  "accuracySeconds",
  "successExitStatus",
  "restartForceExitStatus",
  "startLimitIntervalSeconds",
] as const
const SYSTEMD_LIST_KEYS = ["after", "wants", "stops"] as const

export type Read = { readonly services: readonly Service[] } | { readonly refused: string }

export function textsIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  const took: string[] = []
  for (const one of held) {
    if (typeof one !== "string" || one.trim() === "") return null
    took.push(one)
  }
  return took.length === 0 ? null : took
}

export function runsIn(value: Value): readonly string[] | null {
  return textsIn(value.runs)
}

export function systemdIn(value: Value): Systemd | undefined {
  const held = value.systemd
  if (held === null || typeof held !== "object" || Array.isArray(held)) return undefined
  const one = held as Record<string, unknown>
  const took: Record<string, unknown> = {}
  for (const key of SYSTEMD_TEXT_KEYS) if (typeof one[key] === "string") took[key] = one[key]
  for (const key of SYSTEMD_NUMBER_KEYS) if (typeof one[key] === "number") took[key] = one[key]
  for (const key of SYSTEMD_LIST_KEYS) {
    const stated = textsIn(one[key])
    if (stated !== null) took[key] = stated
  }
  if (typeof one.catchUp === "boolean") took.catchUp = one.catchUp
  return took as Systemd
}

export function runsFrom(root: string, value: Value): readonly string[] | Refused | null {
  const starts = startsIn(value.starts)
  return starts === null ? runsIn(value) : commandsOf(root, starts)
}

export function refusedIn(held: readonly string[] | Refused | null): held is Refused {
  return held !== null && !Array.isArray(held)
}

export function serviceIn(root: string, value: Value): Started | null {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const definition = textAt(value, "definition")
  const runs = runsFrom(root, value)
  const enabled = value.enabled
  if (id === null || slug === null || definition === null || runs === null) return null
  if (refusedIn(runs)) return null
  if (typeof enabled !== "boolean") return null
  const systemd = systemdIn(value)
  const needsSecrets = value.needsSecrets
  const port = value.port
  const worksWithinSeconds = value.worksWithinSeconds
  return {
    id,
    pageTypeSlug: SERVICE_PAGE_TYPE,
    slug,
    definition,
    runs,
    enabled,
    ...(systemd === undefined ? {} : { systemd }),
    ...(typeof needsSecrets === "boolean" ? { needsSecrets } : {}),
    ...(typeof port === "number" ? { port } : {}),
    ...(typeof worksWithinSeconds === "number" ? { worksWithinSeconds } : {}),
  }
}

function serviceAt(root: string, path: string): Service | string {
  const value = valueAt(path, root)
  if (value === null) return `${path} did not load, so the service it states is not read`
  const runs = runsFrom(root, value)
  if (refusedIn(runs)) return `${path} states a start that will not compose — ${runs.refused}`
  const service = serviceIn(root, value)
  if (service === null) {
    return `${path} states no slug, definition, runs and enabled, so it is no workstation service`
  }
  return { service, pagePath: path }
}

export function readFor(root: string, slug: string): Read {
  const found = listedAt(root, SERVICE_PAGE_TYPE, slug)
  const one = found[0]
  if (one === undefined) return { refused: `no ${SERVICE_PAGE_TYPE} is slugged \`${slug}\`` }
  const read = serviceAt(root, one.path)
  return typeof read === "string" ? { refused: read } : { services: [read] }
}

export function everyService(root: string): Read {
  const found = [...everyOfType(root, SERVICE_PAGE_TYPE)].sort((a, b) =>
    a.path < b.path ? -1 : a.path > b.path ? 1 : 0
  )
  const services: Service[] = []
  for (const one of found) {
    const read = serviceAt(root, one.path)
    if (typeof read === "string") return { refused: read }
    services.push(read)
  }
  return { services }
}
