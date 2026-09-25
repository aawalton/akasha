import { watchCommittedData } from "akasha/alan/harness/code-editor/data-interface/modules/committed-data-watching/committed-data-watching.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  watchCommittedData()
  return await NEVER
}
