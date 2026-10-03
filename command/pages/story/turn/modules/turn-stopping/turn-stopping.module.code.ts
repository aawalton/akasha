import { spawn } from "node:child_process"
import { join } from "node:path"

const CLI = "command/modules/cli/cli.module.code.ts"

const STOPPING = ["seat", "supervisor", "stop", "--force"] as const

const UNNAMED: readonly string[] = ["AGENT_ID", "CLAUDE_CODE_SESSION_ID"]

export function stoppedApart(root: string, seat: string): undefined {
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !UNNAMED.includes(key))
  )
  const child = spawn(process.execPath, [join(root, CLI), ...STOPPING, seat], {
    cwd: root,
    detached: true,
    stdio: "ignore",
    env,
  })
  child.unref()
  return undefined
}
