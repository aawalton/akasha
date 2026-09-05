import { existsSync } from "node:fs"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { PAGE_EXTENSION, pageStemOf } from "@akasha/pages-system/markdown-page-name"
import {
  dropUncommitted as dropAkasha,
  mergeUncommitted,
  removeUncommitted as removeAkasha,
} from "@akasha/pages-system/page-uncommitted"
import {
  type Beside,
  CARRIED,
  type Kind,
  RECORDS,
} from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaSeatRelPath } from "../seat-page-akasha/seat-page-akasha.module.code.ts"

// EVERY WRITE OF WHAT IS OBSERVED OF A SEAT GOES THROUGH HERE, AND REACHES AKASHA ALONE. A dozen
// callers reached the old store directly, so this became the one place a second write could go; now
// it is the one place the first write went, and taking it out here took it out of all twelve.
//
// THE SEAT IS NAMED, AND NOTHING IS OPENED. Every caller held the name already and spelled a path
// in the old store out of it so that the name could be read straight back off — which is why a
// write here turned on a spelling belonging to a store that no longer exists.

export type { Beside, Carried, Kind } from "../seat-akasha-beside/seat-akasha-beside.module.code.ts"

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

// A record is written whole or not at all: the store merges at the top level, so a second write
// naming one field of `proxy` would take the other two away. Every caller writes all of a record's
// fields in one call, and this holds them together as one value.
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

// A SEAT IS NAMED HERE RATHER THAN ITS PAGE ADDRESSED. Every caller already held the seat's name
// and spelled a path out of it only so this could read the name straight back off — and the path it
// spelled was one in the old store, which is why it had to be spelled the old store's way.
//
// A path is still taken as well as a name. The worktree is shared and unbuilt, so callers move onto
// the name one at a time and each of them runs against this while the others have not moved yet.
// `pageStemOf` refuses akasha's spelling by design: it reads `<stem>.<type>.md`, so handing it a
// seat page in akasha throws rather than answering a name, and that throw would land in the beat.
function seatNamed(said: string): string {
  return said.includes("/") || said.endsWith(`.${PAGE_EXTENSION}`) ? pageStemOf(said) : said
}

function akashaPageOf(page: string): string | null {
  const root = rootFor(resolveRoots(), AKASHA)
  const relPath = akashaSeatRelPath(seatNamed(page))
  return existsSync(`${root}/${relPath}`) ? relPath : null
}

// WHAT THIS THROWS REACHES THE CALLER, and it did not while there were two stores. The second write
// failing was survivable then because the first one had landed and the fleet was reading it; it was
// caught here so it could not take the surviving write down with it.
//
// Nothing survives it now. A write lost here is a value that silently stops moving, and the value
// that stops moving is usually `supervisor-process` — which does not read as stale, it reads as a
// definite absence, and an absence is what takes a seat's page away. So the failure that used to be
// worth swallowing is now the one that must be loudest.
//
// Every caller either catches this already or throws on purpose. The heartbeat catches it and logs,
// so a refused write costs a beat rather than the supervisor.
function inAkasha(page: string, values: Beside): void {
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

export function keepBeside(page: string, values: Beside): void {
  inAkasha(page, values)
}

// A RECORD IS HANDED OVER WHOLE AND REACHES BOTH STORES WHOLE. They merge at different depths — the
// old store within the key, akasha at the top of the page — so a record is the one shape where
// handing over less than all of it means two different things in the two places.
//
// This used to take the fields that changed and put the rest back by reading the record out of the
// old store. That read is what made the old store the engine this one ran on: akasha held four
// fields only because the old store had just finished assembling them, and no writer could stop
// writing outside akasha while it was true.
//
// Reading the base from akasha instead was tried and taken back out: it dropped three of `astra`'s
// four fields inside the hour, and the cause was never established. Nothing reads a base now. The
// caller already held the whole record — it was narrowing it to the changed fields and throwing the
// rest away — so it hands over what it had.
//
// A KEY AKASHA DECLARES NO RECORD FOR IS REFUSED RATHER THAN DROPPED. It used to reach the old
// store alone, which is why `turn-working` could be written at all; with that store gone there is
// nowhere for it to land, and returning as though it had landed is the failure this whole migration
// is made of. It is carried by declaring the property and naming it in `RECORDS`.
export function keepBesideUnder(page: string, key: string, values: Beside): void {
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

// Only a key held at the top of the page in akasha can be taken away on its own. A field of a
// record goes with the record, and nothing drops one.
export function dropBeside(page: string, keys: readonly string[]): void {
  const gone = keys.flatMap((key) => {
    const where = CARRIED[key]
    return where !== undefined && where.at.length === 1 ? [where.at[0] as string] : []
  })
  if (gone.length === 0) return
  const at = akashaPageOf(page)
  if (at === null) return
  dropAkasha(rootFor(resolveRoots(), AKASHA), at, gone)
}

// WHAT SITS BESIDE A PAGE GOES WITH THE PAGE. A sidecar outliving its page is
// what the outage was made of, and akasha states the rule of itself: the gate refuses a file no
// page claims.
//
// This waited on the session moving onto the page. While what a seat was bound to sat beside it
// and nowhere else, taking akasha's sidecar was forgetting rather than tidying — it would have
// left a swept seat with nothing to come back on. Committed, the session outlives both sidecars,
// and everything still sitting beside a seat can be observed again by watching it for a few
// seconds. So there is nothing left here worth keeping past the page.
//
// The seat is named rather than the page looked up, so this does not turn on whether the akasha
// page has already gone. Its callers take the pages away in opposite orders.
//
// WHAT THIS THROWS IS STILL CAUGHT, UNLIKE THE WRITES ABOVE. A lost write leaves a value saying
// something false about a seat that is running. A lost removal leaves a sidecar beside a page that
// has gone, which the gate names on the next read and a walk sweeps after. Its callers are taking
// pages away in a loop, and aborting that loop over one of them would leave the rest in place.
export function removeBeside(page: string): void {
  try {
    removeAkasha(rootFor(resolveRoots(), AKASHA), akashaSeatRelPath(seatNamed(page)))
  } catch (thrown) {
    process.stderr.write(
      `what was observed of ${seatNamed(page)} is gone, and what was observed of it in akasha remains: ` +
        `${thrown instanceof Error ? thrown.message : String(thrown)}\n`
    )
  }
}
