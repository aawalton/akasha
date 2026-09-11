import { runMonarchReading } from "akasha/alan/harness/monarch/reading/monarch-reading.module.code.ts"

export async function runService(): Promise<void> {
  await runMonarchReading()
}
