import { everyOfType, listedAt } from "@akasha/indexes"
import { textAt, type Value, valueAt } from "@akasha/pages-system/page-value"
import type { Systemd } from "../properties/systemd.record-property.ts"
import type { Service } from "../unit-writing/unit-writing.module.code.ts"
import type { WorkstationService } from "../workstation-service.page-type.ts"

export const SERVICE_PAGE_TYPE = "workstation-service"

const SYSTEMD_TEXT_KEYS = ["restart", "schedule"] as const
const SYSTEMD_NUMBER_KEYS = ["restartDelaySeconds", "startTimeoutSeconds", "jitterSeconds"] as const

export type Read = { readonly services: readonly Service[] } | { readonly refused: string }

export function runsIn(value: Value): readonly string[] | null {
  const held = value.runs
  if (!Array.isArray(held)) return null
  const runs: string[] = []
  for (const one of held) {
    if (typeof one !== "string" || one.trim() === "") return null
    runs.push(one)
  }
  return runs.length === 0 ? null : runs
}

export function systemdIn(value: Value): Systemd | undefined {
  const held = value.systemd
  if (held === null || typeof held !== "object" || Array.isArray(held)) return undefined
  const one = held as Record<string, unknown>
  const took: Record<string, unknown> = {}
  for (const key of SYSTEMD_TEXT_KEYS) if (typeof one[key] === "string") took[key] = one[key]
  for (const key of SYSTEMD_NUMBER_KEYS) if (typeof one[key] === "number") took[key] = one[key]
  if (typeof one.catchUp === "boolean") took.catchUp = one.catchUp
  return took as Systemd
}

export function serviceIn(value: Value): WorkstationService | null {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const definition = textAt(value, "definition")
  const runs = runsIn(value)
  const enabled = value.enabled
  if (id === null || slug === null || definition === null || runs === null) return null
  if (typeof enabled !== "boolean") return null
  const systemd = systemdIn(value)
  const needsSecrets = value.needsSecrets
  const port = value.port
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
  }
}

function serviceAt(root: string, path: string): Service | string {
  const value = valueAt(path, root)
  if (value === null) return `${path} did not load, so the service it states is not read`
  const service = serviceIn(value)
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
