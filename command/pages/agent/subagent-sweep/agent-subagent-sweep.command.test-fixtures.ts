import { expect } from "bun:test"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { ProcLivenessEntry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.code.ts"
import { entry } from "akasha/agent/modules/proc-liveness/agent-proc-liveness.module.test-fixtures.ts"
import { refusalsKept } from "akasha/agent/modules/refusals-keeping/refusals-keeping.module.code.ts"
import {
  CARRIED_AT,
  LEFT_BY,
  seatEditsAt,
  seatRefusalsAt,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { subagentStopped } from "akasha/agent/subagent/properties/subagent-stopped.boolean-property.ts"
import {
  EXIT,
  OperationalError,
} from "akasha/alan/harness/errors-core/modules/exit-code/exit-code.module.code.ts"
import { editsAt } from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import type {
  Asking,
  Landing,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { declaringUnder } from "akasha/check/test/fixture/declaring/declaring.test-fixture.code.ts"
import type { SubagentNode } from "akasha/code/editor/extension/modules/subagent-reading/subagent-reading.module.code.ts"
import type { Applied } from "akasha/command/modules/applying/applying.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import type { Refused } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  agentSubagentSweep,
  type RunningSaid,
  type SeatTranscripts,
  TAKE,
} from "akasha/command/pages/agent/subagent-sweep/agent-subagent-sweep.command.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import {
  bodyAt,
  writing,
} from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { said as gitIn } from "akasha/git/modules/running/git-running.module.code.ts"
import { refreshedIn } from "akasha/page/index/modules/reading/index-reading.module.test-fixtures.ts"
import {
  listedFiled,
  valueAlsoFiled,
} from "akasha/page/index/test-fixtures/filing/index-filing.test-fixture.code.ts"
import { mergeUncommitted } from "akasha/page/modules/uncommitted/page-uncommitted.module.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

const OTHER_ID = "01a05844-6e60-7000-b54c-4b14559df70c"

export const OWN = "a38f63805f9b94edf"

export const AGAIN = "a38f63805f9b94ee0"

const CHILD = "claude --dangerously-skip-permissions --model opus"

const TASK = "rg --json needle ."

const AT = "held/subagents"

const TREE = "akasha"

const IMPORTED_AT = `${TREE}/held.ts`

const IMPORTING_AT = `${TREE}/holding.ts`

const BASE = "0000000000000000000000000000000000000000"

export const COMMIT = "1111111111111111111111111111111111111111"

const LANDED: Applied = {
  base: BASE,
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: COMMIT,
}

function agentIdOf(seatId: string, own: string): string {
  return `${seatId}--${own}`
}

export const ACTING = agentIdOf(SEAT_ID, OWN)

export const GONE: readonly ProcLivenessEntry[] = [
  entry({ agentId: OTHER_ID, cmdline: CHILD, pid: 8 }),
]

export const ALIVE: readonly ProcLivenessEntry[] = [
  entry({ agentId: SEAT_ID, cmdline: CHILD, pid: 8 }),
]

export const ACTS: readonly ProcLivenessEntry[] = [
  entry({ agentId: SEAT_ID, actingAgentId: ACTING, cmdline: TASK, pid: 9 }),
]

function pathOf(seatName: string, own: string): string {
  return `${AT}/${seatName}-${own}.subagent.ts`
}

function bodyOf(seatName: string, own: string, agentId: string): string {
  const slug = `${seatName}${own.slice(0, 1).toUpperCase()}${own.slice(1)}`
  return [
    `export const ${slug} = {`,
    '  pageTypeSlug: "subagent",',
    `  slug: ${JSON.stringify(`${seatName}-${own}`)},`,
    `  principalSeatName: ${JSON.stringify(`seat/${seatName}`)},`,
    '  assignmentSlug: "domain/akasha",',
    '  dispatchedAs: "Explore",',
    `  agentId: ${JSON.stringify(agentId)},`,
    "} as const",
    "",
  ].join("\n")
}

function seated(root: string): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(declaringUnder(TREE))) writing(root, path, body)
  writing(root, IMPORTED_AT, "export const held = 1\n")
  writing(root, IMPORTING_AT, 'import { held } from "./held.ts"\n\nexport const holding = held\n')
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  refreshedIn(root, TREE)
  return root
}

function paged(root: string, seatName: string, own: string, agentId: string): string {
  const at = pathOf(seatName, own)
  const slug = `${seatName}-${own}`
  writing(root, at, bodyOf(seatName, own, agentId))
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", `${slug} is there`])
  valueAlsoFiled(root, "subagent", [{ path: at, value: { pageTypeSlug: "subagent", slug } }])
  return at
}

const KEPT_ROW = { kind: "add", path: `${TREE}/kept.ts`, content: "export const kept = 1\n" }

const ROW = `${JSON.stringify(KEPT_ROW)}\n`

export const REFUSAL = "the body moved under the change"

export const NOTHING_KEPT = { edits: "", refusals: "" }

export function editsBeside(root: string, page: string): string {
  const at = editsAt(page)
  if (at === null) throw new Error(`${page} keeps no edits`)
  writing(root, at, ROW)
  return at
}

function stopPut(root: string, page: string): undefined {
  mergeUncommitted(root, page, { [subagentStopped.propertySlug]: true })
  return undefined
}

function stoppedWorld(): { root: string; base: string; at: string } {
  const held = worldWith()
  stopPut(held.root, held.at)
  return held
}

export async function stoppedGoes(): Promise<undefined> {
  const { root, base, at } = stoppedWorld()
  const held = landings()
  const said = await removing(root, base, ALIVE, saying([]), held.landing)
  reportSays(said, "0 working, 1 stale, 0 undetermined", "stopped from the agents panel")
  expect(held.asked()).toEqual([[{ at: TAKE, given: { at } }]])
  expect(held.said().join("\n")).toContain("stopped from the agents panel")
  return undefined
}

export async function stoppedStays(
  seen: readonly ProcLivenessEntry[],
  own: readonly string[]
): Promise<undefined> {
  const { root, base, at } = stoppedWorld()
  const held = landings()
  const said = await removing(root, base, seen, saying(own), held.landing)
  reportSays(said, "1 working, 0 stale, 0 undetermined")
  expect(held.asked()).toEqual([])
  expect(there(root, at)).toBe(true)
  return undefined
}

export async function refusedEachWord(
  root: string,
  base: string,
  held: Landings
): Promise<undefined> {
  for (const word of ["--all", "--force", pathOf("akasha", OWN)]) {
    const said = await agentSubagentSweep(
      [word],
      givenIn(root),
      GONE,
      base,
      saying([]),
      held.landing
    )
    expect(said.code).toBe(1)
    expect(said.refusals.join("\n")).toContain(`\`${word}\` is no argument`)
  }
  return undefined
}

export function refusalBeside(root: string, page: string): undefined {
  refusalsKept(root, page, [REFUSAL])
  return undefined
}

export function seatFiled(root: string, seatName: string, seatId: string): string {
  const at = `held/seat/${seatName}/${seatName}.seat.ts`
  writing(root, at, `export const ${seatName} = { assignmentSlug: "domain/akasha" }\n`)
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", `${seatName} sits`])
  listedFiled(root, "seat", seatName, [{ path: at, id: seatId }])
  return at
}

export function keptRowBy(kept: string, named: string): undefined {
  expect(JSON.parse(kept)).toEqual({
    [LEFT_BY]: named,
    [CARRIED_AT]: expect.any(String),
    ...KEPT_ROW,
  })
  return undefined
}

export function keptBySeat(
  root: string,
  seat: string
): { readonly edits: string; readonly refusals: string } {
  return { edits: bodyAt(root, seatEditsAt(seat)), refusals: bodyAt(root, seatRefusalsAt(seat)) }
}

export function logPut(baseDir: string, seatId: string, lines: readonly string[]): undefined {
  mkdirSync(join(baseDir, seatId), { recursive: true })
  writeFileSync(join(baseDir, seatId, "subagent-presence.log"), `${lines.join("\n")}\n`)
}

export function takeLine(seatName: string, own: string): string {
  return `subagent-presence: take ${seatName} ${own} — another landing held the lock`
}

export interface Landings {
  readonly landing: Landing
  readonly asked: () => readonly (readonly Asking[])[]
  readonly said: () => readonly string[]
}

export function landings(answer: Applied | Refused = LANDED): Landings {
  const asked: (readonly Asking[])[] = []
  const said: string[] = []
  return {
    landing: (_root, changes, message, _agentId, noting) => {
      asked.push(changes)
      said.push(message)
      if ("commit" in answer && answer.commit !== null) noting?.done?.push(answer.commit)
      return Promise.resolve(answer)
    },
    asked: () => asked,
    said: () => said,
  }
}

export function givenIn(root: string): Given {
  return { root, calledAs: "akasha agent subagent sweep", from: root, writer: null, agentId: null }
}

export function removing(
  root: string,
  base: string,
  seen: readonly ProcLivenessEntry[],
  said: RunningSaid,
  landing: Landing
): Promise<Answer> {
  return agentSubagentSweep(["--remove"], givenIn(root), seen, base, said, landing)
}

export function reported(
  root: string,
  base: string,
  seen: readonly ProcLivenessEntry[],
  said: RunningSaid
): Promise<string> {
  return agentSubagentSweep([], givenIn(root), seen, base, said).then((one) =>
    one.report.join("\n")
  )
}

export function reportSays(said: Answer, ...held: readonly string[]): string {
  const report = said.report.join("\n")
  for (const one of held) expect(report).toContain(one)
  return report
}

export const LOCK_HELD = "another landing held the lock"

export function refusedRemoving(
  root: string,
  base: string,
  seen: readonly ProcLivenessEntry[],
  said: RunningSaid
): Promise<Answer> {
  const held = landings({ refusals: [LOCK_HELD], code: EXIT.OPERATIONAL })
  return removing(root, base, seen, said, held.landing)
}

export function there(root: string, at: string): boolean {
  return existsSync(join(root, at))
}

export function node(agentId: string | null, children: readonly SubagentNode[] = []): SubagentNode {
  return { key: `tool-${agentId ?? "unnamed"}`, label: "Explore", agentId, children }
}

export function reading(
  by: Readonly<Record<string, readonly SubagentNode[]>>,
  ended: Readonly<Record<string, readonly string[]>> = {}
): SeatTranscripts {
  return {
    forSeat: (agentId) => Promise.resolve(by[agentId] ?? []),
    endedForSeat: (agentId) => Promise.resolve(ended[agentId] ?? []),
  }
}

export const UNREADABLE: SeatTranscripts = {
  forSeat: () => Promise.reject(new Error("EACCES: permission denied")),
  endedForSeat: () => Promise.reject(new Error("EACCES: permission denied")),
}

export function halfReading(ended: Readonly<Record<string, readonly string[]>>): SeatTranscripts {
  return {
    forSeat: () => Promise.reject(new Error("EACCES: permission denied")),
    endedForSeat: (agentId) => Promise.resolve(ended[agentId] ?? []),
  }
}

export function saying(
  own: readonly string[],
  ended: readonly string[] = [],
  outlived: readonly string[] = []
): RunningSaid {
  return () =>
    Promise.resolve({
      running: new Set(own),
      ended: new Set(ended),
      outlived: new Set(outlived),
    })
}

export const THROWS: RunningSaid = () => Promise.reject(new Error("no transcript would open"))

export const world = scratchWorld()

export const NOWHERE = "/var/tmp/subagent-sweep-no-transcript.jsonl"

export function worldWith(): { root: string; base: string; at: string } {
  const root = seated(world.rootFor("subagent-sweep-"))
  return {
    root,
    base: world.rootFor("subagent-sweep-logs-"),
    at: paged(root, "akasha", OWN, ACTING),
  }
}

export function threePaged(): { root: string; base: string; gone: string } {
  const root = seated(world.rootFor("subagent-sweep-"))
  paged(root, "akasha", OWN, ACTING)
  paged(root, "akasha", AGAIN, agentIdOf(SEAT_ID, AGAIN))
  return {
    root,
    base: world.rootFor("subagent-sweep-logs-"),
    gone: paged(root, "thea", OWN, agentIdOf(OTHER_ID, OWN)),
  }
}

export function twoThea(): { root: string; base: string; kept: string; gone: string } {
  const root = seated(world.rootFor("subagent-sweep-"))
  const kept = paged(root, "thea", OWN, agentIdOf(OTHER_ID, OWN))
  const gone = paged(root, "thea", AGAIN, agentIdOf(OTHER_ID, AGAIN))
  editsBeside(root, kept)
  return { root, base: world.rootFor("subagent-sweep-logs-"), kept, gone }
}

export function countingReads(): { reads: SeatTranscripts; asked: () => number } {
  let asked = 0
  const reads: SeatTranscripts = {
    forSeat: () => {
      asked += 1
      return Promise.resolve([])
    },
    endedForSeat: () => {
      asked += 1
      return Promise.resolve([])
    },
  }
  return { reads, asked: () => asked }
}

export const THROWN: Landing = () => {
  throw new OperationalError("another landing held the lock")
}

export const THREW_AFTER: Landing = (_root, _changes, _message, _agentId, noting) => {
  noting?.done?.push(COMMIT)
  throw new OperationalError("the commit landed and the work after that commit stopped")
}

export function twoWaiting(root: string): undefined {
  seatFiled(root, "thea", OTHER_ID)
  editsBeside(root, paged(root, "thea", OWN, agentIdOf(OTHER_ID, OWN)))
  editsBeside(root, paged(root, "thea", AGAIN, agentIdOf(OTHER_ID, AGAIN)))
  return undefined
}

export function unlandedBy(seatName: string, own: string): string {
  return `${seatName}-${own} left 1 edit(s) unlanded`
}

export function oneWaiting(): { root: string; base: string; at: string; seat: string } {
  const { root, base, at } = worldWith()
  const seat = seatFiled(root, "akasha", SEAT_ID)
  editsBeside(root, at)
  return { root, base, at, seat }
}
