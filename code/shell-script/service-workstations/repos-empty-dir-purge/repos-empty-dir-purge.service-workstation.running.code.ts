import { join } from "node:path"
import { reposEmptyDirPurge } from "akasha/code/shell-script/pages/repos-empty-dir-purge/repos-empty-dir-purge.shell-script.ts"
import { shellScript } from "akasha/code/shell-script/shell-script.page-type.ts"
import { runBinary } from "akasha/infrastructure/service/workstation/modules/binary-running/binary-running.module.code.ts"
import { runOf } from "akasha/infrastructure/service/workstation/modules/run-composing/run-composing.module.code.ts"
import { checkoutAt } from "akasha/infrastructure/service/workstation/modules/service-checkout/service-checkout.module.code.ts"

const STARTS = `${shellScript.slug}/${reposEmptyDirPurge.slug}` as const
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
