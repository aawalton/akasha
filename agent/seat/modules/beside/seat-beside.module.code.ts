import { existsSync } from "node:fs"
import {
  type Beside,
  CARRIED,
  type Carried,
  type Kind,
  RECORDS,
} from "akasha/agent/seat/modules/akasha-beside/seat-akasha-beside.module.code.ts"
import { seatPathForName } from "akasha/agent/seat/modules/reading/seat-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  AKASHA,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import {
  PAGE_EXTENSION,
  pageStemOf,
} from "akasha/page/modules/markdown-page-name/markdown-page-name.module.code.ts"
import { mergeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export function bare(held: unknown): unknown {
  if (held === null || typeof held !== "object" || Array.isArray(held)) return held
  const rec = held as Record<string, unknown>
  const keys = Object.keys(rec)
  if (!keys.includes("value")) return held
  if (!keys.every((one) => one === "value" || one === "at")) return held
  return rec["value"]
}

function asKind(held: unknown, kind: Kind): unknown {
  if (held === null || held === undefined || held === "") return null
  if (kind === "text") return String(held)
  const said = Number(held)
  if (!Number.isFinite(said)) return null
  return kind === "number" ? said : new Date(said).toISOString()
}

function addressed(where: Carried, said: unknown): unknown {
  if (where.reaches === undefined || typeof said !== "string") return said
  return namedAs(where.reaches, slugOf(said), null)
}

function carriedFrom(values: Beside): Beside | null {
  const held: Beside = {}
  let any = false
  for (const [key, value] of Object.entries(values)) {
    const record = RECORDS[key]
    if (record !== undefined) {
      held[record] = value
      any = true
      continue
    }
    const where = CARRIED[key]
    if (where === undefined) continue
    const said = addressed(where, asKind(bare(value), where.kind))
    const [one, two] = where.at
    if (one === undefined) continue
    if (two === undefined) held[one] = said
    else {
      const under = (held[one] ?? {}) as Beside
      under[two] = said
      held[one] = under
    }
    any = true
  }
  return any ? held : null
}

function seatNamed(said: string): string {
  return said.includes("/") || said.endsWith(`.${PAGE_EXTENSION}`) ? pageStemOf(said) : said
}

function akashaPageOf(page: string): string | null {
  const root = rootFor(resolveRoots(), AKASHA)
  const relPath = seatPathForName(seatNamed(page))
  return existsSync(`${root}/${relPath}`) ? relPath : null
}

function inAkasha(page: string, values: Beside): undefined {
  const unknown = Object.keys(values).filter(
    (key) => CARRIED[key] === undefined && RECORDS[key] === undefined
  )
  if (unknown.length > 0) {
    throw new Error(
      `akasha carries nothing of a seat named ${unknown.join(", ")}, so what was written under ` +
        `${unknown.length === 1 ? "it" : "them"} beside ${seatNamed(page)} has nowhere to land. ` +
        "This was a silent drop into the old store; it is a refusal now. Carry the key by declaring " +
        "the property on the seat page type and naming it in CARRIED or RECORDS."
    )
  }
  const carried = carriedFrom(values)
  if (carried === null) return
  const at = akashaPageOf(page)
  if (at === null) {
    throw new Error(
      `no page in akasha names the seat ${seatNamed(page)}, so what is observed of it has ` +
        "nowhere to be written. This used to be a silent return, when the old store was still taking the write."
    )
  }
  mergeUncommitted(rootFor(resolveRoots(), AKASHA), at, carried)
}

export function keepBeside(page: string, values: Beside): undefined {
  inAkasha(page, values)
}

export function keepBesideUnder(page: string, key: string, values: Beside): undefined {
  if (RECORDS[key] === undefined) {
    throw new Error(
      `akasha declares no record named ${key} of a seat, so what was written under it beside ` +
        `${seatNamed(page)} has nowhere to go. Declare the property and name it in RECORDS.`
    )
  }
  const under: Beside = {}
  for (const [name, value] of Object.entries(values)) under[exportedAs(name)] = bare(value)
  inAkasha(page, { [key]: under })
}
