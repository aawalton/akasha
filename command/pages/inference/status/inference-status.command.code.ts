import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { inferenceStatus as page } from "akasha/command/pages/inference/status/inference-status.command.ts"
import { targetOf } from "akasha/infrastructure/inference/command/modules/inference-answering/inference-answering.module.code.ts"
import { inferenceHosts } from "akasha/infrastructure/inference/pool/modules/inference-hosts/inference-hosts.module.code.ts"
import { runSshCapture } from "akasha/infrastructure/inference/pool/modules/inference-ssh/inference-ssh.module.code.ts"
import {
  buildQueryScript,
  parseActualState,
} from "akasha/infrastructure/inference/pool/modules/provision-script/provision-script.module.code.ts"

export async function inferenceStatus(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return refusedBy(read.refused)

  return await answering(async (done) => {
    for (const host of inferenceHosts()) {
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
