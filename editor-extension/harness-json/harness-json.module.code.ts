import { runCommand } from "../harness-call/harness-call.module.code.ts"

const COMMAND_TIMEOUT_MS = 30_000

const MAX_BUFFER = 8 * 1024 * 1024

export async function askHarness(command: string, args: readonly string[] = []): Promise<unknown> {
  const stdout = await runCommand(command, args, {
    timeout: COMMAND_TIMEOUT_MS,
    maxBuffer: MAX_BUFFER,
  })
  try {
    return JSON.parse(stdout) as unknown
  } catch (err) {
    throw new Error(`${command} did not print JSON: ${String(err)}`)
  }
}
