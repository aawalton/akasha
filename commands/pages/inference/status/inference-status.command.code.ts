import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  targetOf,
  wasRefused,
  wordsIn,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { HOSTS } from "akasha/infrastructure/inference/pool/inference-hosts/inference-hosts.module.code.ts"
import { runSshCapture } from "akasha/infrastructure/inference/pool/inference-ssh/inference-ssh.module.code.ts"
import {
  buildQueryScript,
  parseActualState,
} from "akasha/infrastructure/inference/pool/provision-script/provision-script.module.code.ts"

export async function inferenceStatus(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  if (wasRefused(said)) return refusedBy(said.refused)
  if (said.loose.length > 0) {
    return refusedBy([`\`${said.loose[0]}\` follows nothing this takes — it takes nothing`])
  }

  return await answering(async () => {
    const report: string[] = []
    for (const host of Object.values(HOSTS)) {
      report.push(`${host.name}\t${host.address}`)
      const actual = parseActualState(await runSshCapture(targetOf(host), buildQueryScript(host)))
      if (actual.length === 0) {
        report.push("\t(no managed services)")
        continue
      }
      for (const one of actual) {
        report.push(
          `\t${one.name}\tdir=${one.dirPresent}\tenv=${one.condaEnvPresent}` +
            `\tlaunchd=${one.launchdLoaded}\thash=${one.inputsHash ?? "none"}`
        )
      }
    }
    return told(report)
  })
}
