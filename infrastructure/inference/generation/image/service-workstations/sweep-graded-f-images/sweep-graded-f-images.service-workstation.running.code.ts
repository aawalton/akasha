import { sweepGradedF } from "akasha/infrastructure/inference/generation/image/modules/graded-f-sweeping/graded-f-sweeping.module.code.ts"

const REMOVE = "--remove"

export async function runService(): Promise<void> {
  const code = await sweepGradedF([REMOVE])
  if (code !== 0) process.exit(code)
}
