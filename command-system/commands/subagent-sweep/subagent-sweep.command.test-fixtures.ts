import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { writing } from "@akasha/command-system/scratching/testing"
import type { SubagentNode } from "@akasha/editor-extension/subagent-reading"
import { said as gitIn } from "@akasha/git/git-running"
import { rebuiltIn } from "@akasha/indexes/testing"
import type { ProcLivenessEntry } from "@akasha/seat-system/seat-proc-liveness"
import { declaringUnder } from "@akasha/testing-system/declaring"
import type { Given } from "../../calling/calling.module.code.ts"
import type { RunningSaid, SeatTranscripts } from "./subagent-sweep.command.code.ts"

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
  writing(root, at, bodyOf(seatName, own, agentId))
  gitIn(root, ["add", "-A"])
  gitIn(root, ["commit", "--quiet", "-m", `${seatName}-${own} is there`])
  return at
}

export function logPut(baseDir: string, seatId: string, lines: readonly string[]): undefined {
  mkdirSync(join(baseDir, seatId), { recursive: true })
  writeFileSync(join(baseDir, seatId, "subagent-presence.log"), `${lines.join("\n")}\n`)
}

export function takeLine(seatName: string, own: string): string {
  return `subagent-presence: take ${seatName} ${own} — another landing held the lock`
}

export function entry(over: Partial<ProcLivenessEntry> & { agentId: string }): ProcLivenessEntry {
  return { cmdline: CHILD, pid: 1, ...over }
}

export function givenIn(root: string): Given {
  return { root, calledAs: "akasha subagent sweep", from: root, writer: null, agentId: null }
}

export function there(root: string, at: string): boolean {
  return existsSync(join(root, at))
}

// A ROW AS A TRANSCRIPT LEAVES ONE. The id is the launch receipt's, so `null` is the row a
// compacted or truncated transcript leaves, which is the shape the census must be inert to.
export function node(agentId: string | null, children: readonly SubagentNode[] = []): SubagentNode {
  return { key: `tool-${agentId ?? "unnamed"}`, label: "Explore", agentId, children }
}

export function reading(by: Readonly<Record<string, readonly SubagentNode[]>>): SeatTranscripts {
  return { forSeat: (agentId) => Promise.resolve(by[agentId] ?? []) }
}

export const UNREADABLE: SeatTranscripts = {
  forSeat: () => Promise.reject(new Error("EACCES: permission denied")),
}

export function saying(own: readonly string[]): RunningSaid {
  return () => Promise.resolve(new Set(own))
}

export const THROWS: RunningSaid = () => Promise.reject(new Error("no transcript would open"))
