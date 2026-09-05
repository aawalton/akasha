import { renameSync, writeFileSync } from "node:fs"
import { compositionFor } from "../../compose-boot/compose-boot.module.code.ts"

const LOG = "[boot-prompt]"

export interface BootPromptOptions {
  readonly tmpDir?: string
}

export function materializeBootPrompt(
  agentId: string | undefined,
  opts?: BootPromptOptions
): Promise<string | null> {
  if (agentId === undefined || agentId === "") {
    console.log(`${LOG} no agent id; spawning with no authored prompt`)
    return Promise.resolve(null)
  }
  const target = `${opts?.tmpDir ?? "/var/tmp"}/agent-boot-prompt-${agentId}.md`
  const tmp = `${target}.tmp-${process.pid}`
  try {
    const body = compositionFor(agentId)
    if (body === "") {
      console.log(`${LOG} ${agentId} composed to nothing; spawning with no authored prompt`)
      return Promise.resolve(null)
    }
    writeFileSync(tmp, body)
    renameSync(tmp, target)
    return Promise.resolve(target)
  } catch (error) {
    console.log(
      `${LOG} could not compose: ${error instanceof Error ? error.message : String(error)}`
    )
    return Promise.resolve(null)
  }
}
