import { cpSync, existsSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { listedFiled, rebuiltIn } from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
import {
  keptAt,
  scratchWorld,
} from "../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import { said as gitIn } from "../../../git/git-running/git-running.module.code.ts"
import { bodyOf, type Landing, pathOf, slugOf, type Went } from "./subagent-presence.module.code.ts"

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

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const ANOTHER = "01a05844-6e60-7000-b54c-4b14559df70c"

export const AGENT = "01a05844-6e60-7000-b54c-4b14559df70d"

export const OWN = "a38f63805f9b94edf"

export const TREE = "akasha"

export const SEAT_AT = `${TREE}/seat-system/seats/pages/akasha.seat.ts`

export const SEAT_BODY = `export const akasha = { assignmentSlug: "domain/akasha-system" }\n`

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
  rebuiltIn(root, TREE)
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

export function stampOpening(line: string): Date | null {
  const read = STAMP.exec(line)
  if (read === null) return null
  const held = Date.parse(read[1] ?? "")
  return Number.isNaN(held) ? null : new Date(held)
}

export function pastTheStamp(line: string): string {
  return line.replace(STAMP, "")
}

export function idIn(body: string): string | null {
  return /\n {2}id: "([^"]+)",/.exec(body)?.[1] ?? null
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

export const LOCKED: Went = {
  why: "another landing has held `.git/akasha-landing.lock` for longer than 120s",
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
