import { appendFileSync, existsSync, rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { READS_AT, SUBAGENT_MARK } from "../../../commands/modules/reading/reading.module.code.ts"
import { rootOf } from "../../../commands/modules/rooting/rooting.module.code.ts"
import { ASIDE, SCOPE_FLAG } from "../../hook-answer/hook-answer.module.code.ts"

const HOOK = "clear-reads-on-context-replaced"

export const NAMED = "AGENT_ID"

const ACTING = "agent_id"

const CLEARINGS_AT = `${READS_AT}/clearings.jsonl`

const REPLACING: readonly string[] = ["startup", "clear", "compact"]

export const SCOPE: readonly string[] = [
  `${HOOK} clears one agent's record of what it has read, and refuses nothing.`,
  "  it runs at SessionStart, over no tool, and every call reaches the harness either way",
  `  a source of ${REPLACING.join(", ")} replaces the context, so the record is taken away`,
  "  a source of resume leaves the record in place, because the context is as it was",
  "",
  "WHERE THE RULE COMES FROM: a reading recorded says the agent holds those bytes, and `akasha",
  "read` answers with what changed since. A context that was replaced holds none of them, so a",
  "record left behind would have the command answer with a diff against bytes nobody is holding.",
  "",
  "WHAT IS TAKEN AWAY:",
  `  \`${READS_AT}/agent/id/<agent>\`, the folder of the one agent whose context went.`,
  `  That agent is the seat \`${NAMED}\` names, or, where the payload names an \`${ACTING}\`, the`,
  `    subagent \`<seat>${SUBAGENT_MARK}<${ACTING}>\` acting under it. The harness raises this event`,
  "    for a subagent's own session as well as a seat's, and both arrive carrying the seat's",
  `    \`${NAMED}\`, so the payload is the only thing that tells the two apart.`,
  "  With none named, nothing is cleared.",
  "  No other folder is reached, because the agent's own id opens the path.",
  "  A record that was not there is no clearing, and this says so rather than claiming one.",
  "",
  "WHAT IS WRITTEN DOWN:",
  `  one line in \`${CLEARINGS_AT}\` for each source that replaces, naming the agent, the source,`,
  "    and whether a record was there to take. This is the only trace a clearing leaves, because",
  "    a wrong agent, a right agent and no agent at all take the same path through this code.",
  "  Nothing is written where the record folder is not there already.",
  "",
  "This hook acts rather than judges, and it is why the folder it removes and the mark that opens",
  "a subagent's name are spelled from constants the reading module owns rather than written again.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a source this does not name, which leaves the record in place rather than guessing at it",
  "  a compaction seen at PreCompact or PostCompact, which this is not registered at",
  "  a record that will not be removed, which is left as it is and never fails the session",
  "  a sibling subagent's record, which belongs to a context this event says nothing about",
  "  a seat's subagents' records when the seat's own context goes, which nothing here takes",
  "  every other record an agent keeps, none of which this reads or writes",
  "",
  "The absence of a record from this list is NOT a finding that it survives a replacement. It is",
  "unexamined. A record that turns out to describe held context belongs beside this one, cleared",
  "by the same act, not left in place because this hook did not name it.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this sits:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function replacing(source: string): boolean {
  return REPLACING.includes(source)
}

export function recordAt(root: string, agentId: string): string {
  return join(root, READS_AT, "agent", "id", agentId)
}

export function cleared(root: string, agentId: string | null, source: string): boolean {
  if (agentId === null || agentId === "") return false
  if (!replacing(source)) return false
  const at = recordAt(root, agentId)
  if (!existsSync(at)) return false
  try {
    rmSync(at, { recursive: true, force: true })
  } catch {
    return false
  }
  return !existsSync(at)
}

export function clearingsAt(root: string): string {
  return join(root, CLEARINGS_AT)
}

export function noted(
  root: string,
  agentId: string | null,
  source: string,
  took: boolean
): undefined {
  const at = clearingsAt(root)
  if (!existsSync(dirname(at))) return
  const said = { at: new Date().toISOString(), agentId, source, took }
  try {
    appendFileSync(at, `${JSON.stringify(said)}\n`)
  } catch {}
}

export function seatIn(env: Readonly<Record<string, string | undefined>>): string | null {
  const held = env[NAMED]
  return held === undefined || held === "" ? null : held
}

function saidIn(raw: string, key: string): string {
  try {
    const payload: unknown = JSON.parse(raw)
    const said = (payload as Record<string, unknown> | null)?.[key]
    return typeof said === "string" ? said : ""
  } catch {
    return ""
  }
}

export function actingIn(raw: string): string | null {
  const said = saidIn(raw, ACTING).trim()
  return said === "" ? null : said
}

export function agentIn(
  env: Readonly<Record<string, string | undefined>>,
  raw: string
): string | null {
  const seat = seatIn(env)
  if (seat === null) return null
  const acting = actingIn(raw)
  return acting === null ? seat : `${seat}${SUBAGENT_MARK}${acting}`
}

export function sourceIn(raw: string): string {
  return saidIn(raw, "source")
}

export async function ranAsClearing(
  env: Readonly<Record<string, string | undefined>>,
  at: string
): Promise<number> {
  if (Bun.argv[2] === SCOPE_FLAG) {
    process.stdout.write(`${SCOPE.join("\n")}\n`)
    return ASIDE
  }
  const raw = await Bun.stdin.text()
  const root = rootOf(at)
  const agentId = agentIn(env, raw)
  const source = sourceIn(raw)
  const took = cleared(root, agentId, source)
  if (replacing(source)) noted(root, agentId, source, took)
  return ASIDE
}

export async function ran(): Promise<number> {
  return await ranAsClearing(process.env, import.meta.path)
}

if (import.meta.main) process.exit(await ran())
