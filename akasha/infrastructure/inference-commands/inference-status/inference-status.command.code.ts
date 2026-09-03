import type { Answer } from "@akasha/command-system/calling"
import { HOSTS } from "@akasha/inference-pool/inference-hosts"
import { parseActualState } from "@akasha/inference-pool/inference-reconcile"
import { runSshCapture } from "@akasha/inference-pool/inference-ssh"
import { buildQueryScript } from "@akasha/inference-pool/provision-script"
import {
  answering,
  refusalIn,
  refusedBy,
  targetOf,
  told,
  wordsIn,
} from "../inference-answering/inference-answering.module.code.ts"

export async function inferenceStatus(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, [], [])
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)
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
