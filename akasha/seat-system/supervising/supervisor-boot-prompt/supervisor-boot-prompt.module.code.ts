import { existsSync, renameSync } from "node:fs"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"

const LOG = "[boot-prompt]"
const COMPOSE_RELPATH = "tools/compose-boot.ts"

const COMPOSE_CEILING_MS = 30_000

export interface BootPromptOptions {
  readonly tmpDir?: string
  readonly ceilingMs?: number
}

export async function materializeBootPrompt(
  agentId: string | undefined,
  opts?: BootPromptOptions
): Promise<string | null> {
  if (agentId === undefined || agentId === "") {
    console.log(`${LOG} no agent id; spawning with no authored prompt`)
    return null
  }
  const verb = `${rootFor(resolveRoots(), AKASHA)}/${COMPOSE_RELPATH}`
  if (!existsSync(verb)) {
    console.log(`${LOG} ${verb} is not there; spawning with no authored prompt`)
    return null
  }
  const target = `${opts?.tmpDir ?? "/tmp"}/agent-boot-prompt-${agentId}.md`
  const tmp = `${target}.tmp-${process.pid}`
  try {
    const proc = Bun.spawn({
      cmd: [process.execPath, verb, "--agent", agentId, "--out", tmp],
      stdin: "ignore",
      stdout: "ignore",
      stderr: "pipe",
    })
    const ceiling = opts?.ceilingMs ?? COMPOSE_CEILING_MS
    let overran = false
    const backstop = setTimeout(() => {
      overran = true
      proc.kill("SIGKILL")
    }, ceiling)
    let exitCode: number
    try {
      exitCode = await proc.exited
    } finally {
      clearTimeout(backstop)
    }
    if (overran) {
      console.log(
        `${LOG} ${COMPOSE_RELPATH} did not finish within ${ceiling}ms; spawning with no authored prompt`
      )
      return null
    }
    if (exitCode !== 0) {
      console.log(`${LOG} ${COMPOSE_RELPATH} exited non-zero; spawning with no authored prompt`)
      return null
    }
    if (!existsSync(tmp) || Bun.file(tmp).size === 0) {
      console.log(`${LOG} ${agentId} composed to nothing; spawning with no authored prompt`)
      return null
    }
    renameSync(tmp, target)
    return target
  } catch (error) {
    console.log(
      `${LOG} could not compose: ${error instanceof Error ? error.message : String(error)}`
    )
    return null
  }
}
