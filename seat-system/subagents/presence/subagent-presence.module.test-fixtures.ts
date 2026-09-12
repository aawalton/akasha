import { cpSync, existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { blobIdOf, recordRead } from "akasha/agents/read-record/read-record.module.code.ts"
import { PUT_BACK } from "akasha/commands/modules/change-freshness/change-freshness.module.code.ts"
import {
  heldSaid,
  holding,
  LOCK_AT,
  refusedWhereHeld,
  WAITED_AT_MOST,
} from "akasha/commands/modules/holding/holding.module.code.ts"
import { keptAt, scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import {
  bodyAt,
  writing,
} from "akasha/commands/modules/scratching/scratching.module.test-fixtures.ts"
import { startedAt } from "akasha/files/lock-holder/lock-holder.module.code.ts"
import { said as gitIn } from "akasha/git/running/git-running.module.code.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { refreshedIn } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import {
  seatEditsAt,
  seatRefusalsAt,
} from "akasha/seat-system/subagent-recovering/subagent-recovering.module.code.ts"
import {
  bodyOf,
  type Landing,
  pathOf,
  slugOf,
  type Went,
} from "akasha/seat-system/subagents/presence/subagent-presence.module.code.ts"
import { declaringUnder } from "akasha/testing-system/declaring/declaring.module.code.ts"
import { firstCapture } from "akasha/utils/narrow/first-capture/first-capture.module.code.ts"

const LANDED = { base: "", landed: [], formatted: [], said: [], wrong: [], commit: null }

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

export const BODY_STATES = [
  'from "akasha/seat-system/subagents/subagent.page-type.types.ts"',
  "export const akashaAbc = {",
  'type: "subagent"',
  'slug: "akasha-abc"',
  'principalSeatName: "akasha"',
  'assignmentSlug: "domain/akasha-system"',
  'dispatchedAs: "Explore"',
  'agentId: "seat--own"',
]

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

export const AGENT = "01a05844-6e60-7000-b54c-4b14559df70d"

export const OWN = "a38f63805f9b94edf"

export const TREE = "akasha"

export const SEAT_AT = `${TREE}/seat-system/seats/pages/akasha.seat.ts`

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

export function seated(root: string): string {
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

export function readingKept(root: string, at: string): undefined {
  const oid = blobIdOf(new TextEncoder().encode(readFileSync(join(root, at), "utf8")))
  recordRead(root, AGENT, { path: at, oid, seenAt: 1, carriedOid: null })
  return undefined
}

export function subagentsFiled(root: string, at: string, other: string): undefined {
  const own = slugOf("akasha", OWN)
  const second = slugOf("akasha", "second")
  listedFiled(root, "subagent", own, [{ path: at, id: SEAT_ID }])
  listedFiled(root, "subagent", second, [{ path: other, id: ANOTHER }])
  valueAlsoFiled(root, "subagent", [
    { path: at, value: { id: SEAT_ID, slug: own } },
    { path: other, value: { id: ANOTHER, slug: second } },
  ])
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

export const STAMP = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}) /

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

export const GOING: Went = { went: true }

export const LOCKED: Went = { why: heldSaid(WAITED_AT_MOST) }

export function lockHeldIn(root: string): undefined {
  writing(root, LOCK_AT, `${process.pid} ${startedAt(process.pid)}`)
}

export const HELD_LANDING: Landing = (root) =>
  refusedWhereHeld(() => Promise.resolve(holding(root, () => LANDED, 0)))

export const MOVED: Went = {
  why: `one.subagent.ts — read against \`abc\`, and what is at \`def\` is not what was read, ${PUT_BACK}`,
}

export const REFUSED: Went = { why: "no assignment is stated for the akasha seat" }

export function counting(answers: readonly Went[]): {
  readonly ask: () => Promise<Went>
  readonly waited: (ms: number) => Promise<void>
  readonly waits: number[]
  readonly count: () => number
} {
  let asked = 0
  const waits: number[] = []
  return {
    ask: () => {
      asked += 1
      return Promise.resolve(answers[Math.min(asked - 1, answers.length - 1)] ?? GOING)
    },
    waited: (ms: number) => {
      waits.push(ms)
      return Promise.resolve()
    },
    waits,
    count: () => asked,
  }
}
