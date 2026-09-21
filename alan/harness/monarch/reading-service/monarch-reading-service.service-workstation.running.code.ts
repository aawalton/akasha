import {
  readingTimedOut,
  runMonarchReading,
} from "akasha/alan/harness/monarch/modules/reading/monarch-reading.module.code.ts"

export async function runService(): Promise<void> {
  try {
    await runMonarchReading()
  } catch (thrown) {
    if (!readingTimedOut(thrown)) throw thrown
    process.stdout.write(
      "Monarch did not answer in time, so the readout keeps the count it holds and the next run takes a fresh one\n"
    )
  }
}
