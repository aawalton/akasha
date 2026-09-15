import { sweepWindowPages } from "akasha/alan/harness/code-editor/window/modules/window-page-sweeping/window-page-sweeping.module.code.ts"

const REMOVE = "--remove"

export async function runService(): Promise<void> {
  const code = await sweepWindowPages([REMOVE])
  if (code !== 0) process.exit(code)
}
