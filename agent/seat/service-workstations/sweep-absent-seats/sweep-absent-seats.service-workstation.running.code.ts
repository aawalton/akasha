import { sweepAbsentSeats } from "akasha/agent/seat/stopping/modules/absent-sweeping/absent-sweeping.module.code.ts"
import { leftWhereCodeMoved } from "akasha/infrastructure/service/workstation/modules/code-moving/code-moving.module.code.ts"

const EVERY_MS = 5_000

const NEVER: Promise<never> = new Promise(() => {})

async function sweep(): Promise<void> {
  try {
    for (const name of await sweepAbsentSeats()) {
      process.stdout.write(`${name} had no agent in it, so that seat is ended\n`)
    }
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    process.stderr.write(`sweep-absent-seats: this round found nothing out — ${why}\n`)
  }
  leftWhereCodeMoved()
}

export async function runService(): Promise<never> {
  await sweep()
  setInterval(() => {
    void sweep()
  }, EVERY_MS)
  return await NEVER
}
