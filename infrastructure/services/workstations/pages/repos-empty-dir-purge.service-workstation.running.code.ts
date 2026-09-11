import { join } from "node:path"
import { runBinary } from "akasha/infrastructure/services/workstations/binary-running/binary-running.module.code.ts"
import { runOf } from "akasha/infrastructure/services/workstations/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/services/workstations/service-checkout/service-checkout.module.code.ts"

const STARTS = "shell-script/repos-empty-dir-purge"
const REFUSED_EXIT = 2

export async function runService(): Promise<never> {
  const root = checkoutAt()
  const run = runOf(root, STARTS)
  if ("refused" in run) {
    process.stderr.write(`${run.refused}\n`)
    return process.exit(REFUSED_EXIT)
  }
  return await runBinary([run.runner, join(root, run.path)])
}
