import { appendFileSync, mkdirSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { clearings } from "akasha/agent/hook/agent-hook/properties/clearings.file-property.ts"
import {
  ASIDE,
  parseHookPayload,
  SCOPE_FLAG,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import {
  SUBAGENT_MARK,
  type Swept,
  sweptReadings,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const HOOK = "clear-reads-on-context-replaced"

export const NAMED = "AGENT_ID"

const ACTING = "agent_id"

const CODE_ENDING = ".code.ts"

const HELD = "jsonl"

function pageOfCode(at: string): string {
  return at.endsWith(CODE_ENDING) ? `${at.slice(0, -CODE_ENDING.length)}.ts` : at
}

const REPLACING: readonly string[] = ["startup", "clear", "compact", "fork"]

export const KEPT_FOR = 24 * 60 * 60 * 1000

export const SCOPE: readonly string[] = [
  `${HOOK} clears one agent's record of what it has read, and refuses nothing.`,
  "  it runs at SessionStart, over no tool, and every call reaches the harness either way",
  `  a source of ${REPLACING.join(", ")} replaces the context, so the record is taken away`,
  "  a source of resume leaves the record in place, because the context is as it was",
  "",
  "WHERE THE RULE COMES FROM: a reading recorded says the agent holds those bytes now, rather",
  "than that it read them once. `akasha read` spends the record that way: over a body that has",
  "not moved it says you read this body already and hands nothing back, and over one that has",
  "moved it answers with a difference headed `as you last read it`. A context that was replaced",
  "holds neither, so a record left behind would keep the page out of the answer and diff against",
  "bytes nobody is holding.",
  "",
  "A COMPACTION IS ONE OF THEM. It is the same agent at the same seat in the same session, and",
  "what it replaces the transcript with is a summary of itself: what the agent learned survives",
  "and the bodies do not. A reading is of the bodies. One left behind would lock the agent out",
  "of the page it can no longer quote, which costs more than reading that page again. A page an",
  "agent must hold again is read with `--full`, which passes the record over.",
  "",
  "A FORK IS ONE OF THEM TOO. A fork may start from an earlier message than the end of the",
  "transcript it forks, as `--fork-session` with `--resume-session-at` does, so the forked",
  "session need not hold a body the record says it holds. The fork keeps the seat's",
  `\`${NAMED}\`, so the session it came from loses its readings as well, and reads again.`,
  "",
  "WHAT IS TAKEN AWAY:",
  "  every reading in the file beside the page of the agent whose context went.",
  `  That agent is the seat \`${NAMED}\` names, or, where the payload names an \`${ACTING}\`, the`,
  `    subagent \`<seat>${SUBAGENT_MARK}<${ACTING}>\` acting under it. The harness raises this event`,
  "    for a subagent's own session as well as a seat's, and both arrive carrying the seat's",
  `    \`${NAMED}\`, so the payload is the only thing that tells the two apart.`,
  "  With none named, no agent's own readings go, and the stale ones below still do.",
  "  every reading last seen more than a day ago, whoever holds it.",
  "  The record is one file for each agent, and the agents are read from the index, so both",
  "    sweeps open the same handful of files. That costs the same whether or not it also weighs",
  "    what it passes, and a context being replaced is the one moment slow enough to spend it,",
  "    so the two are one sweep.",
  "  A file the sweep empties is left holding nothing rather than taken, because the page it",
  "    sits beside is still there.",
  "  A record that was not there is no clearing, and this says so rather than claiming one.",
  "",
  "WHAT IS WRITTEN DOWN:",
  "  one line beside this hook's own page for each source that replaces, naming the agent, the",
  "    source,",
  "    whether a record was there to take, and how many stale readings went. This is the only",
  "    trace a clearing leaves, because a wrong agent, a right agent and no agent at all take",
  "    the same path through this code.",
  "",
  "This hook acts rather than judges, and it is why the property its note sits under and the mark",
  "that opens a subagent's name are spelled from pages rather than written again.",
  "",
  "NOT REACHED. Each measured against this hook, not supposed:",
  "  a source this does not name, which leaves the record in place rather than guessing at it",
  "  a compaction seen at PreCompact or PostCompact, which this is not registered at",
  "  a record that will not be removed, which is left as it is and never fails the session",
  "  a sibling subagent's readings seen within the day, which belong to a context this says",
  "    nothing about; its older ones go with every other agent's older ones",
  "  a seat's subagents' readings seen within the day when the seat's own context goes",
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

export const NOTHING_SWEPT: Swept = { agent: 0, stale: 0 }

export function cleared(root: string, agentId: string | null, source: string): Swept {
  if (!replacing(source)) return NOTHING_SWEPT
  try {
    return sweptReadings(root, agentId, Date.now() - KEPT_FOR)
  } catch {
    return NOTHING_SWEPT
  }
}

export function took(swept: Swept): boolean {
  return swept.agent > 0
}

const PAGE_AT = relative(rootOf(import.meta.path), pageOfCode(import.meta.path))

export function clearingsAt(root: string): string {
  const at = uncommittedBesideAt(PAGE_AT, clearings.propertySlug, HELD)
  return at === null ? "" : join(root, at)
}

export function noted(
  root: string,
  agentId: string | null,
  source: string,
  swept: Swept
): undefined {
  const at = clearingsAt(root)
  if (at === "") return
  mkdirSync(dirname(at), { recursive: true })
  const said = {
    at: new Date().toISOString(),
    agentId,
    source,
    took: took(swept),
    stale: swept.stale,
  }
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
    const payload = parseHookPayload(raw)
    const said = payload?.[key]
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

async function ranAsClearing(
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
  const swept = cleared(root, agentId, source)
  if (replacing(source)) noted(root, agentId, source, swept)
  return ASIDE
}

async function ran(): Promise<number> {
  return await ranAsClearing(process.env, import.meta.path)
}

if (import.meta.main) process.exit(await ran())
