import { sweepRecords } from "akasha/pages/modules/record-sweeping/record-sweeping.module.code.ts"

const REMOVE = "--remove"

export function runService(): undefined {
  const code = sweepRecords([REMOVE])
  if (code !== 0) process.exit(code)
}
