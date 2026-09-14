import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import {
  type Landing,
  landingsIn,
} from "akasha/agents/hooks/agent-hook/block-akasha-shell-writes/block-akasha-shell-writes.agent-hook.code.ts"
import {
  payloadIn,
  REFUSED,
  unreadable,
} from "akasha/agents/hooks/modules/answer/hook-answer.module.code.ts"
import { insideOf, settled } from "akasha/agents/hooks/modules/settling/settling.module.code.ts"

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

function refusalFor(command: string, from: string, held: readonly string[]): string | null {
  for (const landing of landingsIn(command)) {
    if (givesBack(landing)) continue
    const at = settled(resolve(from, landing.at))
    const mount = held.find((one) => insideOf(one, at))
    if (mount !== undefined) return refusing(landing.how, landing.at, mount)
  }
  return null
}

async function main(): Promise<number> {
  const raw = await Bun.stdin.text()
  if (raw.trim() === "") return 0
  const payload = payloadIn(raw)
  if (payload === null) {
    const unread = unreadable(HOOK_NAME, "the hook payload would not read")
    process.stderr.write(`${unread.err}\n`)
    return unread.code
  }
  const held = payload as {
    readonly tool_input?: { readonly command?: unknown }
    readonly cwd?: unknown
  }
  const command = typeof held.tool_input?.command === "string" ? held.tool_input.command : ""
  if (command.trim() === "") return 0
  const from = typeof held.cwd === "string" && held.cwd !== "" ? held.cwd : process.cwd()
  const said = refusalFor(command, from, mountsNow())
  if (said === null) return 0
  process.stderr.write(`${said}\n`)
  process.stdout.write(`${JSON.stringify({ decision: "block", reason: said }, null, 2)}\n`)
  return REFUSED
}

async function ran(): Promise<number> {
  return await main()
}

if (import.meta.main) process.exit(await ran())
