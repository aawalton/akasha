import { stoppedTaken } from "akasha/agent/subagent/modules/stale-taking/subagent-stale-taking.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const WENT = " went"

export async function runService(): Promise<void> {
  const said = await stoppedTaken(akashaRoot())
  for (const one of said.report) if (one.endsWith(WENT)) process.stdout.write(`${one}\n`)
  for (const one of said.refusals) process.stdout.write(`${one}\n`)
}
