import { cpSync, existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { agentPaged } from "akasha/agent/modules/read-record/read-record.module.test-fixtures.ts"
import { bodyOf } from "akasha/agent/subagent/modules/body/subagent-body.module.code.ts"
import type {
  Liveness,
  Reading,
} from "akasha/agent/subagent/modules/liveness/subagent-liveness.module.code.ts"
import {
  pathOf,
  slugOf,
} from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { wrote } from "akasha/agent/subagent/modules/presence/subagent-presence.module.code.ts"
import {
  seatEditsAt,
  seatRefusalsAt,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import type { Landing } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { declaringUnder } from "akasha/check/test/fixture/declaring/declaring.test-fixture.code.ts"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  bodyAt,
  writing,
} from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { keptAt } from "akasha/file/disk/test-fixtures/kept-scratch/kept-scratch.test-fixture.code.ts"
import { startedAt } from "akasha/file/modules/lock-holder/lock-holder.module.code.ts"
import {
  holding,
  LOCK_AT,
  refusedWhereHeld,
} from "akasha/git/modules/holding/holding.module.code.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { refreshedIn } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"

const LANDED = { base: "", landed: [], formatted: [], said: [], wrong: [], commit: null }

export const COMMITTED = "1111111111111111111111111111111111111111"

export function landingNaming(named: string[]): Landing {
  return (root, changes, message) => {
    for (const one of changes) {
      named.push(one.at)
      const given = one.given as { readonly at: string; readonly body?: string }
      if (given.body === undefined) rmSync(join(root, given.at), { force: true })
      else writing(root, given.at, given.body)
    }
    gitIn(root, ["add", "-A"])
    gitIn(root, ["commit", "--quiet", "-m", message])
    return Promise.resolve(LANDED)
  }
}

export const LANDS: Landing = landingNaming([])

export const ROW = `${JSON.stringify({ kind: "remove", path: "one.md" })}\n`

export const REFUSAL = "the body moved under the change"

export const NOTHING_KEPT = { edits: "", refusals: "" }

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

export const AGENT = "01a05844-6e60-7000-b54c-4b14559df70d"

export const OWN = "a38f63805f9b94edf"

const TREE = "akasha"

export const SEAT_AT = `${TREE}/agent/seat/pages/akasha.seat.ts`

export const SEAT_BODY = `export const akasha = { assignmentSlug: "domain/akasha-system" }\n`

export const PERSONA_AT = "akasha/persona-system/personas/akasha/akasha.persona.ts"

export const MECHANICAL = "Checks-bypassed: a `change-mechanical` change runs no check"

export const WENT = { went: true } as const

export const HELD_ID = "01a06d00-0000-7000-8000-000000000001"

export const HELD_ASSIGNMENT = "domain/held-before"

const IMPORTED_AT = `${TREE}/held.ts`

const IMPORTED_BODY = "export const held = 1\n"

const IMPORTING_AT = `${TREE}/holding.ts`

const IMPORTING_BODY = 'import { held } from "./held.ts"\n\nexport const holding = held\n'

let seed: string | null = null

function seeding(root: string): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(declaringUnder(TREE))) writing(root, path, body)
  writing(root, IMPORTED_AT, IMPORTED_BODY)
  writing(root, IMPORTING_AT, IMPORTING_BODY)
  writing(root, SEAT_AT, SEAT_BODY)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  refreshedIn(root, TREE)
  listedFiled(root, "seat", "akasha", [{ path: SEAT_AT, id: SEAT_ID }])
  return root
}

function seedIn(): string {
  seed ??= seeding(keptAt("subagent-presence-seed-"))
  return seed
}

function seated(root: string): string {
  cpSync(seedIn(), root, { recursive: true })
  return root
}

export async function underSeat(act: (root: string) => Promise<void>): Promise<undefined> {
  const world = scratchWorld()
  try {
    await act(seated(world.rootFor("subagent-presence-")))
  } finally {
    world.sweep()
  }
}

export function inScratch(act: (root: string) => void): undefined {
  const world = scratchWorld()
  try {
    act(world.rootFor("subagent-presence-"))
  } finally {
    world.sweep()
  }
}

export async function inTwoScratch(
  act: (root: string, base: string) => Promise<void>
): Promise<undefined> {
  const world = scratchWorld()
  try {
    const root = seated(world.rootFor("subagent-presence-"))
    await act(root, world.rootFor("subagent-presence-logs-"))
  } finally {
    world.sweep()
  }
}

export function keptBySeat(root: string): { readonly edits: string; readonly refusals: string } {
  return {
    edits: bodyAt(root, seatEditsAt(SEAT_AT)),
    refusals: bodyAt(root, seatRefusalsAt(SEAT_AT)),
  }
}

export function pageUnder(root: string, seatName: string): string {
  const slug = slugOf(seatName, OWN)
  const at = pathOf(slug)
  writing(root, at, bodyOf(slug, seatName, "domain/akasha-system", "Explore", AGENT))
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "a page under a seat the index has no page for"])
  return at
}

function readingOf(liveness: Liveness): Reading {
  return () => Promise.resolve({ liveness, why: `the reading says ${liveness}` })
}

export const RETURNED: Reading = readingOf("returned")

export const UNREAD: Reading = readingOf("unread")

export const WORKING: Reading = readingOf("working")

export async function pageWritten(root: string): Promise<string> {
  await wrote(root, "akasha", SEAT_ID, OWN, "Explore", [], LANDS)
  return pathOf(slugOf("akasha", OWN))
}

export function readingKept(root: string, at: string): undefined {
  const oid = blobIdOf(new TextEncoder().encode(readFileSync(join(root, at), "utf8")))
  agentPaged(root, AGENT)
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, carriedOid: null })
  return undefined
}

export function messageIn(root: string): string {
  return gitIn(root, ["log", "-1", "--pretty=%B"])
}

export function whyIn(went: unknown): string {
  return typeof went === "object" && went !== null && "why" in went ? String(went.why) : ""
}

export async function loggedAt(at: string, within: number): Promise<string> {
  const until = Date.now() + within
  while (Date.now() < until) {
    if (existsSync(at)) {
      const held = readFileSync(at, "utf8")
      if (held !== "") return held
    }
    await Bun.sleep(50)
  }
  return existsSync(at) ? readFileSync(at, "utf8") : ""
}

const STAMP = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}) /

function parseStampDate(found: RegExpExecArray | null): Date | null {
  if (found === null) return null
  const held = Date.parse(found[1] ?? "")
  return Number.isNaN(held) ? null : new Date(held)
}

export function stampOpening(line: string): Date | null {
  return parseStampDate(STAMP.exec(line))
}

export function pastTheStamp(line: string): string {
  return line.replace(STAMP, "")
}

export function idIn(body: string): string | null {
  return firstCapture(/\n {2}id: "([^"]+)",/.exec(body))
}

export function landedUnder(root: string, seatName: string, own: string): string {
  return readFileSync(join(root, pathOf(slugOf(seatName, own))), "utf8")
}

export function landedAt(root: string, own: string): string {
  return landedUnder(root, "akasha", own)
}

export function heldUnder(
  root: string,
  seatName: string,
  own: string,
  agentId: string,
  kind: string
): undefined {
  const slug = slugOf(seatName, own)
  const at = pathOf(slug)
  writing(root, at, bodyOf(slug, seatName, HELD_ASSIGNMENT, kind, agentId, HELD_ID))
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "the page was there"])
  gitIn(root, ["rm", "--quiet", at])
  gitIn(root, ["commit", "--quiet", "-m", "the page went"])
}

export function heldInHistory(root: string, own: string, agentId: string, kind: string): undefined {
  heldUnder(root, "akasha", own, agentId, kind)
}

export function lockHeldIn(root: string): undefined {
  writing(root, LOCK_AT, `${process.pid} ${startedAt(process.pid)}`)
}

export const heldLanding: Landing = (root) =>
  refusedWhereHeld(() => Promise.resolve(holding(root, () => LANDED, 0)))

export const threwAfter: Landing = (_root, _changes, _message, noting) => {
  noting?.done?.push(COMMITTED)
  throw new Error("the work after that commit stopped")
}
