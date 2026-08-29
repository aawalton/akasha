import { rmSync } from "node:fs"
import { join } from "node:path"
import {
  agentIdsIn,
  READS_AT,
  SUBAGENT_MARK,
} from "../../../command-system/reading/reading.module.code.ts"
import { rootOf } from "../../../command-system/rooting/rooting.module.code.ts"
import { ASIDE, SCOPE_FLAG } from "../../hook-answer/hook-answer.module.code.ts"

const HOOK = "clear-reads-on-context-replaced"

export const NAMED = "AGENT_ID"

const REPLACING: readonly string[] = ["startup", "clear", "compact"]

export const SCOPE: readonly string[] = [
  `${HOOK} clears one agent's record of what it has read, and refuses nothing.`,
  "  it runs at SessionStart, over no tool, and every call reaches the harness either way",
  `  a source of ${REPLACING.join(", ")} replaces the context, so the record is taken away`,
  "  a source of resume leaves the record standing, because the context stands as it was",
  "",
  "WHERE THE RULE COMES FROM: a reading recorded says the agent holds those bytes, and `akasha",
  "read` answers with what changed since. A context that was replaced holds none of them, so a",
  "record left behind would have the command answer with a diff against bytes nobody is holding.",
  "",
  "WHAT IS TAKEN AWAY:",
  `  \`${READS_AT}/agent/id/<agent>\`, the seat's own folder.`,
  `  \`${READS_AT}/agent/id/<agent>${SUBAGENT_MARK}<subagent>\`, every folder a subagent of that`,
  "    seat kept, because nothing else takes them away and the seat holding none of what they",
  "    read is the same fact that clears its own.",
  `  The agent is the one \`${NAMED}\` names. With none named, nothing is cleared.`,
  "  Another agent's folder is never reached, because the agent's own id opens the path.",
  "",
  "This hook acts rather than judges, and it is why the folder it removes and the mark that opens",
  "a subagent's name are spelled from constants the reading module owns rather than written again.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a source this does not name, which leaves the record standing rather than guessing at it",
  "  a compaction seen at PreCompact or PostCompact, which this is not registered at",
  "  a record that will not be removed, which is left as it stands and never fails the session",
  "  every other record an agent keeps, none of which this reads or writes",
  "",
  "The absence of a record from this list is NOT a finding that it survives a replacement. It is",
  "unexamined. A record that turns out to describe held context belongs beside this one, cleared",
  "by the same act, not left standing because this hook did not name it.",
  "",
  `Printed by \`${HOOK}.agent-hook.code.ts ${SCOPE_FLAG}\`, which is the one place this stands:`,
  "it is what the program says about itself, held as text it prints rather than as a comment.",
]

export function replacing(source: string): boolean {
  return REPLACING.includes(source)
}

export function recordAt(root: string, agentId: string): string {
  return join(root, READS_AT, "agent", "id", agentId)
}

export function underSeat(seat: string, standing: readonly string[]): readonly string[] {
  const held = `${seat}${SUBAGENT_MARK}`
  return [seat, ...standing.filter((one) => one.startsWith(held))]
}

export function cleared(root: string, agentId: string | null, source: string): boolean {
  if (agentId === null || agentId === "") return false
  if (!replacing(source)) return false
  try {
    for (const one of underSeat(agentId, agentIdsIn(root))) {
      rmSync(recordAt(root, one), { recursive: true, force: true })
    }
  } catch {
    return false
  }
  return true
}

export function agentIn(env: Readonly<Record<string, string | undefined>>): string | null {
  const held = env[NAMED]
  return held === undefined || held === "" ? null : held
}

export function sourceIn(raw: string): string {
  try {
    const payload: unknown = JSON.parse(raw)
    const said = (payload as Record<string, unknown> | null)?.["source"]
    return typeof said === "string" ? said : ""
  } catch {
    return ""
  }
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
  cleared(rootOf(at), agentIn(env), sourceIn(raw))
  return ASIDE
}

if (import.meta.main) {
  process.exit(await ranAsClearing(process.env, import.meta.path))
}
