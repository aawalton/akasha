import { existsSync } from "node:fs"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages/checkout-roots"
import { PAGE_EXTENSION, pageStemOf } from "@akasha/pages/markdown-page-name"
import {
  dropUncommitted as dropAkasha,
  mergeUncommitted,
  removeUncommitted as removeAkasha,
} from "@akasha/pages/page-uncommitted"
import {
  type Beside,
  CARRIED,
  type Kind,
  RECORDS,
} from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaSeatRelPath } from "../seat-page-akasha/seat-page-akasha.module.code.ts"

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

function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
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
    const said = asKind(bare(value), where.kind)
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
  const relPath = akashaSeatRelPath(seatNamed(page))
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
  for (const [name, value] of Object.entries(values)) under[camel(name)] = bare(value)
  inAkasha(page, { [key]: under })
}

export function dropBeside(page: string, keys: readonly string[]): undefined {
  const gone = keys.flatMap((key) => {
    const where = CARRIED[key]
    return where !== undefined && where.at.length === 1 ? [where.at[0] as string] : []
  })
  if (gone.length === 0) return
  const at = akashaPageOf(page)
  if (at === null) return
  dropAkasha(rootFor(resolveRoots(), AKASHA), at, gone)
}

export function removeBeside(page: string): undefined {
  try {
    removeAkasha(rootFor(resolveRoots(), AKASHA), akashaSeatRelPath(seatNamed(page)))
  } catch (thrown) {
    process.stderr.write(
      `what was observed of ${seatNamed(page)} is gone, and what was observed of it in akasha remains: ` +
        `${thrown instanceof Error ? thrown.message : String(thrown)}\n`
    )
  }
}
