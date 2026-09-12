import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { inferenceStatus as page } from "akasha/commands/pages/inference/status/inference-status.command.ts"
import { targetOf } from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { HOSTS } from "akasha/infrastructure/inference/pool/inference-hosts/inference-hosts.module.code.ts"
import { runSshCapture } from "akasha/infrastructure/inference/pool/inference-ssh/inference-ssh.module.code.ts"
import {
  buildQueryScript,
  parseActualState,
} from "akasha/infrastructure/inference/pool/provision-script/provision-script.module.code.ts"

export async function inferenceStatus(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return refusedBy(read.refused)

  return await answering(async (done) => {
    for (const host of Object.values(HOSTS)) {
      done.push(`${host.name}\t${host.address}`)
      const actual = parseActualState(await runSshCapture(targetOf(host), buildQueryScript(host)))
      if (actual.length === 0) {
        done.push("\t(no managed services)")
        continue
      }
      for (const one of actual) {
        done.push(
          `\t${one.name}\tdir=${one.dirPresent}\tenv=${one.condaEnvPresent}` +
            `\tlaunchd=${one.launchdLoaded}\thash=${one.inputsHash ?? "none"}`
        )
      }
    }
    return told(done)
  })
}
