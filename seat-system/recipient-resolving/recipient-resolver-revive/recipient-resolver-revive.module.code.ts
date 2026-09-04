import {
  classifyReviveVerifyExit,
  type ReviveVerifySignal,
} from "@akasha/seat-system/seat-revive-verify-signal"
import {
  LOG,
  REPO_ROOT,
} from "../../supervising/supervisor-config/supervisor-config.module.code.ts"
import type { RecipientResolverConfig } from "../recipient-resolver-config/recipient-resolver-config.module.code.ts"

function assertNever(value: never): never {
  const rendered = typeof value === "string" ? value : JSON.stringify(value)
  throw new Error(`assertNever: unhandled variant ${rendered}`)
}

const REVIVE_TIMED_OUT = Symbol("revive-timed-out")

export function reviveArgv(agentId: string, bootPrompt: string | undefined): string[] {
  const argv = ["ops", "seat", "resume", agentId, "--verify", "--json"]
  if (bootPrompt !== undefined && bootPrompt.length > 0) {
    argv.push("--boot-prompt", bootPrompt)
  }
  return argv
}

export async function reviveViaOps(
  agentId: string,
  bootPrompt: string | undefined,
  config: RecipientResolverConfig
): Promise<ReviveVerifySignal> {
  if (config.dryRun) {
    console.log(`${LOG} recipient-resolver: [dry-run] would revive ${agentId} (spawn skipped)`)
    return "benign"
  }
  const proc = Bun.spawn(reviveArgv(agentId, bootPrompt), {
    cwd: REPO_ROOT,
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const collect = Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  const settled = await Promise.race([
    collect,
    new Promise<typeof REVIVE_TIMED_OUT>((resolve) =>
      setTimeout(() => resolve(REVIVE_TIMED_OUT), config.reviveTimeoutMs)
    ),
  ])
  if (settled === REVIVE_TIMED_OUT) {
    proc.kill()
    void collect.catch(() => {})
    console.log(
      `${LOG} recipient-resolver: revive ${agentId} exceeded ${config.reviveTimeoutMs}ms — killed (retry next tick)`
    )
    return "benign"
  }
  const [stdout, stderr, code] = settled
  const signal = classifyReviveVerifyExit(code)
  switch (signal) {
    case "revived":
      console.log(
        `${LOG} recipient-resolver: revived ${agentId} (io advanced past revive — verified)`
      )
      return "revived"
    case "unverified": {
      const detail = (stderr.trim() !== "" ? stderr : stdout).trim()
      console.log(
        `${LOG} recipient-resolver: revive ${agentId} did NOT verify (exit ${code}: io did not advance ` +
          `past revive / boot failed) — NOT revived, surfacing: ${detail}`
      )
      return "unverified"
    }
    case "failed": {
      const detail = (stderr.trim() !== "" ? stderr : stdout).trim()
      console.error(
        `${LOG} recipient-resolver: revive ${agentId} FAILED (exit ${code}) — the seat was NOT ` +
          `revived and the inbound work that matched it is still waiting: ${detail}`
      )
      return "failed"
    }
    case "benign":
      return "benign"
    default:
      return assertNever(signal)
  }
}
