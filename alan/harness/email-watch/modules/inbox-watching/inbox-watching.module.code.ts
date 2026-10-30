import { mailbox } from "akasha/alan/google/email/modules/gmail-mailbox/gmail-mailbox.module.code.ts"
import { oneRun } from "akasha/alan/harness/email-watch/modules/inbox-run/inbox-run.module.code.ts"
import { announce } from "akasha/alan/harness/email-watch/modules/inbox-telling/inbox-telling.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "akasha/infrastructure/service/akasha-service/service-workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const PERSON = optionalEnv("EMAIL_WORKER_PERSON") ?? "alan"
const HANDLER = optionalEnv("EMAIL_WORKER_HANDLER") ?? PERSON
const EVERY_MS = Number(optionalEnv("EMAIL_WORKER_INTERVAL_MS") ?? 60_000)
const SENDER = optionalEnv("EMAIL_WORKER_SENDER") ?? "email-worker"
const ROOT = akashaRoot()

function log(line: string): undefined {
  process.stdout.write(`email-worker: ${line}\n`)
}

export async function runInboxWatching(): Promise<void> {
  const stopping = stopsOnSignal()

  const box = await mailbox()
  log(`watching ${PERSON}'s mail every ${Math.round(EVERY_MS / 1000)}s`)

  while (!stopping.signal.aborted) {
    const done: string[] = []
    try {
      const report = await oneRun(PERSON, ROOT, box, done)
      if (report.acted > 0 || report.waiting > 0 || report.unclaimed > 0 || report.discarded > 0)
        log(
          `${report.examined} examined, ${report.acted} acted on, ${report.waiting} waiting, ` +
            `${report.unclaimed} unclaimed, ${report.discarded} discarded`
        )
      await announce({ handler: HANDLER, sender: SENDER, log })
    } catch (error) {
      log(`pass failed: ${String(error)}`)
      for (const one of done) log(`the run had already done this: ${one}`)
    }
    await sleptUntilStopped(EVERY_MS, stopping.signal)
  }
  log("stopped")
}

if (import.meta.main) {
  await runInboxWatching()
}
