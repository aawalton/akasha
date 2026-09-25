import { existsSync } from "node:fs"
import { module } from "akasha/code/module/module.page-type.ts"
import {
  commandOf,
  type Refused,
  runOf,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/run-composing/run-composing.module.code.ts"
import {
  LOOPBACK,
  portFor,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-binding/service-binding.module.code.ts"
import {
  saidOfNoBundle,
  startedFromBundle,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-bundling/service-bundling.module.code.ts"
import { serviceRunning } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-running/service-running.module.ts"
import type {
  Service,
  Started,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/unit-writing/unit-writing.module.code.ts"
import type { Systemd } from "akasha/infrastructure/service/akasha-service/service-workstation/properties/systemd.record-property.types.ts"
import {
  everyOfType,
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { originSaid } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { pageService } from "akasha/page/service/page-service.service-workstation.ts"

const SERVICE_PAGE_TYPE = "service-workstation"

const PAGE_TYPE = "page-type"

const RUNNER = `${module.slug}/${serviceRunning.slug}` as const

const PAGES_SLUG = pageService.slug

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

type Every = { readonly services: readonly Service[] } | { readonly refused: string }

type Read = Every | { readonly unnamed: string }

function textsIn(held: unknown): readonly string[] | null {
  if (!Array.isArray(held)) return null
  const took: string[] = []
  for (const one of held) {
    if (typeof one !== "string" || one.trim() === "") return null
    took.push(one)
  }
  return took.length === 0 ? null : took
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

export function runnerCodeIn(pages: string | Reading): readonly string[] {
  const run = runOf(pages, RUNNER)
  return "refused" in run ? [] : [run.path]
}

function runsFrom(
  pages: string | Reading,
  value: Value,
  codeAt: string = "",
  bundles: ReadonlyMap<string, string> = new Map()
): readonly string[] | Refused | null {
  const slug = textAt(value, "slug")
  if (slug === null) return null
  const bundle = bundles.get(slug)
  if (bundle !== undefined) {
    if (!existsSync(bundle)) return { refused: saidOfNoBundle(slug, bundle) }
    return [startedFromBundle(bundle)]
  }
  const said = commandOf(pages, { code: RUNNER, arguments: [slug] }, codeAt)
  return "refused" in said ? said : [said.command]
}

function refusedIn(held: readonly string[] | Refused | null): held is Refused {
  return held !== null && !Array.isArray(held)
}

export function serviceIn(
  pages: string | Reading,
  value: Value,
  codeAt: string = "",
  bundles: ReadonlyMap<string, string> = new Map()
): Started | null {
  const id = textAt(value, "id")
  const slug = textAt(value, "slug")
  const definition = textAt(value, "definition")
  const runs = runsFrom(pages, value, codeAt, bundles)
  const enabled = value.enabled
  if (id === null || slug === null || definition === null || runs === null) return null
  if (refusedIn(runs)) return null
  if (typeof enabled !== "boolean") return null
  const systemd = systemdIn(value)
  const needsSecrets = value.needsSecrets
  const port = value.port
  const worksWithinSeconds = value.worksWithinSeconds
  const told = value.told
  const restartsItself = value.restartsItself
  return {
    id,
    type: namedAs(PAGE_TYPE, SERVICE_PAGE_TYPE, null),
    slug,
    definition,
    runs,
    enabled,
    ...(systemd === undefined ? {} : { systemd }),
    ...(typeof needsSecrets === "boolean" ? { needsSecrets } : {}),
    ...(typeof port === "number" ? { port } : {}),
    ...(typeof worksWithinSeconds === "number" ? { worksWithinSeconds } : {}),
    ...(typeof told === "boolean" ? { told } : {}),
    ...(typeof restartsItself === "boolean" ? { restartsItself } : {}),
  }
}

export function pagesOriginIn(pages: string | Reading): string | undefined {
  const port = portFor(pages, PAGES_SLUG)
  return port === null ? undefined : `http://${LOOPBACK}:${port}`
}

export function pagesOriginHere(): string | undefined {
  return originSaid() === null ? pagesOriginIn(akashaRoot()) : undefined
}

function serviceAt(
  pages: string | Reading,
  path: string,
  codeAt: string,
  bundles: ReadonlyMap<string, string>
): Service | string {
  const value = valueByPath(pages, path)
  if (value === null) return `${path} did not load, so the service it states is not read`
  const runs = runsFrom(pages, value, codeAt, bundles)
  if (refusedIn(runs)) return `${path} states a start that will not compose — ${runs.refused}`
  const service = serviceIn(pages, value, codeAt, bundles)
  if (service === null) {
    return `${path} states no slug, definition, runs and enabled, so it is no workstation service`
  }
  const pagesOrigin = pagesOriginIn(pages)
  return { service, pagePath: path, ...(pagesOrigin === undefined ? {} : { pagesOrigin }) }
}

export function readFor(
  pages: string | Reading,
  slug: string,
  codeAt: string = "",
  bundles: ReadonlyMap<string, string> = new Map()
): Read {
  const found = listedAt(pages, SERVICE_PAGE_TYPE, slug)
  const one = found[0]
  if (one === undefined) return { unnamed: `no ${SERVICE_PAGE_TYPE} is slugged \`${slug}\`` }
  const read = serviceAt(pages, one.path, codeAt, bundles)
  return typeof read === "string" ? { refused: read } : { services: [read] }
}

export function everyService(
  pages: string | Reading,
  codeAt: string = "",
  bundles: ReadonlyMap<string, string> = new Map()
): Every {
  const found = [...everyOfType(pages, SERVICE_PAGE_TYPE)].sort((a, b) =>
    a.path < b.path ? -1 : a.path > b.path ? 1 : 0
  )
  const services: Service[] = []
  for (const one of found) {
    const read = serviceAt(pages, one.path, codeAt, bundles)
    if (typeof read === "string") return { refused: read }
    services.push(read)
  }
  return { services }
}
