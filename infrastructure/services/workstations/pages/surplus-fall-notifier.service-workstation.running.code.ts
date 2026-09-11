import { runSurplusFallNotifying } from "akasha/alan/harness/surplus/fall-notifying/surplus-fall-notifying.module.code.ts"

export async function runService(): Promise<void> {
  await runSurplusFallNotifying()
}
