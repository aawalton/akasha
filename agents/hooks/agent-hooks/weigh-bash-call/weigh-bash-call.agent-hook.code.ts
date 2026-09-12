import { Buffer } from "node:buffer"
import { existsSync, readdirSync, readFileSync, realpathSync, rmdirSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Answer } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import {
  LET_THROUGH,
  payloadIn,
  rewriting,
  said,
} from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import { hookAgentId } from "akasha/agents/modules/acting-agent/acting-agent.module.code.ts"
import { seatPageAt } from "akasha/agents/page-reading/agent-page-reading.module.code.ts"
import { fillingAt } from "akasha/checks/modules/cost/check-cost.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { besideAt } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { partFiled } from "akasha/pages/indexes/path/index-path.index.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { pidAliveOrAssumeAlive } from "akasha/utils/process/pid-signal/pid-signal.module.code.ts"

const SCRIPT_TYPE = "shell-script"

const SCRIPT = "bash-call-weighing"

const SHELL = "shell"

const SH = "sh"

const COMMAND = "command"

const INPUT = "tool_input"

const EVENT = "hook_event_name"

const PHASE = "bash"

const MOUNT = "/sys/fs/cgroup"

const OWN = "/proc/self/cgroup"

const LEFT = "akasha-call-"

const DIGITS = /^\d+$/

const QUOTE = "'"

const QUOTED = "'\\''"

const TAIL_HOLDS = 296

export function quoted(text: string): string {
  return `${QUOTE}${text.replaceAll(QUOTE, QUOTED)}${QUOTE}`
}

export function firstLineOf(command: string): string {
  for (const line of command.split("\n")) {
    const held = line.trim()
    if (held !== "") return held
  }
  return ""
}

export function headFor(runId: string, ranAt: string, command: string): string {
  const named = JSON.stringify(firstLineOf(command))
  return `{"runId":"${runId}","ranAt":"${ranAt}","phase":"${PHASE}","ran":${named},`
}

export function lineHolds(head: string): number {
  return Buffer.byteLength(head, "utf8") + TAIL_HOLDS
}

export function wrappedFor(script: string, at: string, head: string, command: string): string {
  return `. ${quoted(script)} ${quoted(at)} ${quoted(head)}\n${command}`
}

export function scriptAt(root: string): string | null {
  const page = listedAt(root, SCRIPT_TYPE, SCRIPT)[0]
  if (page === undefined) return null
  const beside = besideAt(page.path, SHELL, SH)
  if (beside === null) return null
  const at = join(root, beside)
  return existsSync(at) ? at : null
}

export function weighingPid(named: string): number | null {
  const tail = named.slice(LEFT.length)
  return DIGITS.test(tail) ? Number(tail) : null
}

function leftSwept(): undefined {
  let own = ""
  try {
    own = readFileSync(OWN, "utf8").trim().split("\n")[0]?.split(":").at(-1) ?? ""
  } catch {
    return
  }
  if (own === "") return
  const parent = join(MOUNT, dirname(own))
  let held: readonly string[] = []
  try {
    held = readdirSync(parent)
  } catch {
    return
  }
  for (const one of held) {
    if (!one.startsWith(LEFT)) continue
    const pid = weighingPid(one)
    if (pid !== null && pidAliveOrAssumeAlive(pid)) continue
    try {
      rmdirSync(join(parent, one))
    } catch {}
  }
}

export function answerFor(payload: Record<string, unknown>, root: string): Answer {
  const input = payload[INPUT]
  if (input === null || typeof input !== "object" || Array.isArray(input)) return LET_THROUGH
  const held = input as Record<string, unknown>
  const command = held[COMMAND]
  const event = payload[EVENT]
  if (typeof command !== "string" || command === "" || typeof event !== "string") return LET_THROUGH
  const seat = hookAgentId(payload)
  if (seat === null) return LET_THROUGH
  const page = seatPageAt(seat, root)
  if (page === null) return LET_THROUGH
  const script = scriptAt(root)
  if (script === null) return LET_THROUGH
  const head = headFor(Bun.randomUUIDv7(), new Date().toISOString(), command)
  const filling = fillingAt(root, page, lineHolds(head))
  if (filling === null) return LET_THROUGH
  if (filling.opened) partFiled(root, page, filling.at)
  return rewriting(event, {
    ...held,
    [COMMAND]: wrappedFor(script, join(root, filling.at), head, command),
  })
}

async function ran(): Promise<number> {
  const payload = payloadIn(await Bun.stdin.text())
  if (payload === null) return said(LET_THROUGH)
  try {
    leftSwept()
    return said(answerFor(payload, rootOf(realpathSync(import.meta.path))))
  } catch {
    return said(LET_THROUGH)
  }
}

if (import.meta.main) process.exit(await ran())
