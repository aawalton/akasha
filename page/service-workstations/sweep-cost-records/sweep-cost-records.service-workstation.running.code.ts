import { sweepRecords } from "akasha/page/modules/record-sweeping/record-sweeping.module.code.ts"

const REMOVE = "--remove"

export async function runService(): Promise<undefined> {
  const code = await sweepRecords([REMOVE])
  if (code !== 0) process.exit(code)
}
