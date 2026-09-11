import type { Systemd } from "akasha/infrastructure/services/workstations/properties/systemd.record-property.types.ts"
import {
  commandOf,
  commandsOf,
  type Refused,
  startsIn,
} from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import type {
  Service,
  Started,
} from "akasha/infrastructure/services/workstations/unit-writing/unit-writing.module.code.ts"
import { everyOfType, listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export const SERVICE_PAGE_TYPE = "service-workstation"

const WRAPPER_PAGE = "module/service-wrapping"

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

export function runsFrom(
  root: string,
  value: Value,
  codeAt: string = ""
): readonly string[] | Refused | null {
  const starts = startsIn(value.starts)
  return starts === null ? runsIn(value) : commandsOf(root, starts, codeAt)
}

export function refusedIn(held: readonly string[] | Refused | null): held is Refused {
  return held !== null && !Array.isArray(held)
}

export function serviceIn(root: string, value: Value, codeAt: string = ""): Started | null {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const definition = textAt(value, "definition")
  const runs = runsFrom(root, value, codeAt)
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

export function wrapperRunsIn(root: string, codeAt: string = ""): string | Refused {
  const said = commandOf(root, { code: WRAPPER_PAGE }, codeAt)
  return "refused" in said ? said : said.command
}

function serviceAt(
  root: string,
  path: string,
  wrapperRuns: string,
  codeAt: string
): Service | string {
  const value = valueAt(path, root)
  if (value === null) return `${path} did not load, so the service it states is not read`
  const runs = runsFrom(root, value, codeAt)
  if (refusedIn(runs)) return `${path} states a start that will not compose — ${runs.refused}`
  const service = serviceIn(root, value, codeAt)
  if (service === null) {
    return `${path} states no slug, definition, runs and enabled, so it is no workstation service`
  }
  return { service, pagePath: path, wrapperRuns }
}

export function readFor(root: string, slug: string, codeAt: string = ""): Read {
  const wrapperRuns = wrapperRunsIn(root, codeAt)
  if (typeof wrapperRuns !== "string") return { refused: wrapperRuns.refused }
  const found = listedAt(root, SERVICE_PAGE_TYPE, slug)
  const one = found[0]
  if (one === undefined) return { refused: `no ${SERVICE_PAGE_TYPE} is slugged \`${slug}\`` }
  const read = serviceAt(root, one.path, wrapperRuns, codeAt)
  return typeof read === "string" ? { refused: read } : { services: [read] }
}

export function everyService(root: string, codeAt: string = ""): Read {
  const wrapperRuns = wrapperRunsIn(root, codeAt)
  if (typeof wrapperRuns !== "string") return { refused: wrapperRuns.refused }
  const found = [...everyOfType(root, SERVICE_PAGE_TYPE)].sort((a, b) =>
    a.path < b.path ? -1 : a.path > b.path ? 1 : 0
  )
  const services: Service[] = []
  for (const one of found) {
    const read = serviceAt(root, one.path, wrapperRuns, codeAt)
    if (typeof read === "string") return { refused: read }
    services.push(read)
  }
  return { services }
}
