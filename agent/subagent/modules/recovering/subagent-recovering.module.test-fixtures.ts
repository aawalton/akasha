import { mkdirSync, readFileSync, utimesSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { readsBesideAt } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import {
  movedOnto,
  seatEditsAt,
  seatReadsAt,
} from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"

export const SEAT = "agent/seat/pages/tester/tester.seat.ts"

export const UNDER = "agent/subagent/pages/tester-abc/tester-abc.subagent.ts"

export const ROW: FileChange = { kind: "remove", path: "one.md" }

export const OTHER: FileChange = { kind: "remove", path: "two.md" }

export const SEAT_ID = "01a09573-2604-7000-98dd-c04bec8e0696"

export const AGENT_ID = `${SEAT_ID}--abc`

export const AGENT_ID_TOO = `${SEAT_ID}--def`

export const READING = JSON.stringify({ path: "one.md", oid: "aaa", seenAt: 1, carriedOid: null })

export const READING_TOO = JSON.stringify({
  path: "two.md",
  oid: "bbb",
  seenAt: 2,
  carriedOid: null,
})

export function bodyAt(root: string, at: string | null): string {
  if (at === null) return ""
  try {
    return readFileSync(join(root, at), "utf8")
  } catch {
    return ""
  }
}

export function folderFor(root: string, page: string): undefined {
  mkdirSync(dirname(join(root, page)), { recursive: true })
  return undefined
}

function rowsOf(body: string): readonly Record<string, string>[] {
  return body
    .split("\n")
    .filter((one) => one !== "")
    .map((one) => JSON.parse(one) as Record<string, string>)
}

export function keptIn(root: string): readonly Record<string, string>[] {
  return rowsOf(bodyAt(root, seatEditsAt(SEAT)))
}

export function readingsKept(root: string): readonly Record<string, string>[] {
  return rowsOf(bodyAt(root, seatReadsAt(SEAT)))
}

export function subagentPaged(root: string, page: string, agentId: string | null): undefined {
  folderFor(root, page)
  const said = agentId === null ? "" : `, agentId: "${agentId}"`
  writeFileSync(join(root, page), `export const page = { type: "subagent"${said} }\n`)
  return undefined
}

export function readingsPut(root: string, page: string, lines: readonly string[]): undefined {
  const at = readsBesideAt(page)
  if (at === null) return undefined
  folderFor(root, page)
  writeFileSync(join(root, at), lines.map((one) => `${one}\n`).join(""))
  return undefined
}

export function recordedAt(root: string, own: string, seconds: number): string {
  const dir = join(root, "tx", "subagents")
  mkdirSync(dir, { recursive: true })
  const at = join(dir, `agent-${own}.jsonl`)
  writeFileSync(at, "{}\n")
  utimesSync(at, seconds, seconds)
  return join(root, "tx.jsonl")
}

export function keptForOne(root: string): undefined {
  subagentPaged(root, UNDER, AGENT_ID)
  readingsPut(root, UNDER, [READING])
  movedOnto(root, SEAT, UNDER)
  return undefined
}
