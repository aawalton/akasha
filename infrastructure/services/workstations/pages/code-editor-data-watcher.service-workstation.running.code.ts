import { watchEditorData } from "akasha/alan/harness/code-editor/data-interfaces/data-watching/data-watching.module.code.ts"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  watchEditorData()
  return await NEVER
}
