import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import {
  type Landing,
  landingsIn,
} from "akasha/agent/hook/agent-hook/block-akasha-shell-writes/block-akasha-shell-writes.agent-hook.code.ts"
import {
  type Answer,
  refusing as blocking,
  LET_THROUGH,
  ranAsJudgedOnly,
} from "akasha/agent/hook/modules/answer/hook-answer.module.code.ts"
import { insideOf, settled } from "akasha/agent/hook/modules/settling/settling.module.code.ts"

const HOOK_NAME = "block-memory-writes"

const MOUNTS = "/proc/mounts"

const IN_MEMORY = new Set(["tmpfs", "ramfs"])

const GIVES_BACK = new Set(["rm", "rmdir"])

const ON_DISK = "/var/tmp"

const REDIRECTED = "a redirect"

function memoryHeldIn(mounts: string): readonly string[] {
  const found: string[] = []
  for (const line of mounts.split("\n")) {
    const said = line.split(" ")
    const at = said[1]
    const kind = said[2]
    if (at === undefined || kind === undefined) continue
    if (IN_MEMORY.has(kind) && !found.includes(at)) found.push(at)
  }
  return found
}

function mountsNow(): readonly string[] {
  try {
    return memoryHeldIn(readFileSync(MOUNTS, "utf8"))
  } catch {
    return []
  }
}

function refusing(how: string, shown: string, mount: string): string {
  const said =
    how === REDIRECTED
      ? `${HOOK_NAME}: a redirect lands on \`${shown}\``
      : `${HOOK_NAME}: \`${how}\` lands on \`${shown}\``
  return [
    `${said}, under \`${mount}\`, which this machine holds in memory.`,
    "A byte written there is memory the fleet has back only once the file goes, and a file left",
    "there is held for as long as the machine is up. Scratch goes on the disk instead:",
    "",
    `  ${ON_DISK}`,
    "",
    "The scratchpad a session names sits there. A removal is let through, so clearing what is",
    "already written is not refused.",
  ].join("\n")
}

function givesBack(landing: Landing): boolean {
  return GIVES_BACK.has(landing.how)
}

export function refusalFor(command: string, from: string, held: readonly string[]): string | null {
  for (const landing of landingsIn(command)) {
    if (givesBack(landing)) continue
    const at = settled(resolve(from, landing.at))
    const mount = held.find((one) => insideOf(one, at))
    if (mount !== undefined) return refusing(landing.how, landing.at, mount)
  }
  return null
}

export function judgedFor(payload: Record<string, unknown>): Answer {
  const asked = payload as {
    readonly tool_input?: { readonly command?: unknown }
    readonly cwd?: unknown
  }
  const command = typeof asked.tool_input?.command === "string" ? asked.tool_input.command : ""
  if (command.trim() === "") return LET_THROUGH
  const from = typeof asked.cwd === "string" && asked.cwd !== "" ? asked.cwd : process.cwd()
  const said = refusalFor(command, from, mountsNow())
  return said === null ? LET_THROUGH : blocking(said)
}

async function ran(): Promise<number> {
  return await ranAsJudgedOnly(HOOK_NAME, judgedFor)
}

if (import.meta.main) process.exit(await ran())
