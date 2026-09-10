import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { rebuiltIn, valueAlsoFiled } from "@akasha/indexes/testing"
import { declaringUnder } from "@akasha/testing-system/declaring"
import type { Asking } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import type { SubagentNode } from "akasha/editor-extension/subagent-reading/subagent-reading.module.code.ts"
import { said as gitIn } from "../../../../git/git-running/git-running.module.code.ts"
import type { Applied } from "../../../modules/applying/applying.module.code.ts"
import type { Given } from "../../../modules/calling/calling.module.code.ts"
import type { Refused } from "../../../modules/landing/landing.module.code.ts"
import { writing } from "../../../modules/scratching/scratching.module.test-fixtures.ts"
import type { Landing, RunningSaid, SeatTranscripts } from "./agent-subagent-sweep.command.code.ts"

export const SEAT_ID = "01a05844-6e60-7000-b54c-4b14559df70b"

export const OTHER_ID = "01a05844-6e60-7000-b54c-4b14559df70c"

export const OWN = "a38f63805f9b94edf"

export const AGAIN = "a38f63805f9b94ee0"

export const CHILD = "claude --dangerously-skip-permissions --model opus"

export const TASK = "rg --json needle ."

export const AT = "seat-system/subagents/pages"

const TREE = "akasha"

const IMPORTED_AT = `${TREE}/held.ts`

const IMPORTING_AT = `${TREE}/holding.ts`

const BASE = "0000000000000000000000000000000000000000"

const COMMIT = "1111111111111111111111111111111111111111"

const LANDED: Applied = {
  base: BASE,
  landed: [],
  formatted: [],
  said: [],
  wrong: [],
  commit: COMMIT,
}

export function agentIdOf(seatId: string, own: string): string {
  return `${seatId}--${own}`
}

export function pathOf(seatName: string, own: string): string {
  return `${AT}/${seatName}-${own}.subagent.ts`
}

export function bodyOf(seatName: string, own: string, agentId: string): string {
  const slug = `${seatName}${own.slice(0, 1).toUpperCase()}${own.slice(1)}`
  return [
    `export const ${slug} = {`,
    '  pageTypeSlug: "subagent",',
    `  slug: ${JSON.stringify(`${seatName}-${own}`)},`,
    `  principalSeatName: ${JSON.stringify(seatName)},`,
    '  assignmentSlug: "domain/akasha",',
    '  dispatchedAs: "Explore",',
    `  agentId: ${JSON.stringify(agentId)},`,
    "} as const",
    "",
  ].join("\n")
}

export function seated(root: string): string {
  gitIn(root, ["init", "--quiet"])
  gitIn(root, ["config", "user.email", "held@nowhere"])
  gitIn(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(declaringUnder(TREE))) writing(root, path, body)
  writing(root, IMPORTED_AT, "export const held = 1\n")
  writing(root, IMPORTING_AT, 'import { held } from "./held.ts"\n\nexport const holding = held\n')
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", "first"])
  rebuiltIn(root, TREE)
  return root
}

export function paged(root: string, seatName: string, own: string, agentId: string): string {
  const at = pathOf(seatName, own)
  const slug = `${seatName}-${own}`
  writing(root, at, bodyOf(seatName, own, agentId))
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", `${slug} is there`])
  valueAlsoFiled(root, "subagent", [{ path: at, value: { pageTypeSlug: "subagent", slug } }])
  return at
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
    landing: (_root, changes, message) => {
      asked.push(changes)
      said.push(message)
      return Promise.resolve(answer)
    },
    asked: () => asked,
    said: () => said,
  }
}

export function givenIn(root: string): Given {
  return { root, calledAs: "akasha agent subagent sweep", from: root, writer: null, agentId: null }
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

export function saying(own: readonly string[], ended: readonly string[] = []): RunningSaid {
  return () => Promise.resolve({ running: new Set(own), ended: new Set(ended) })
}

export const THROWS: RunningSaid = () => Promise.reject(new Error("no transcript would open"))
