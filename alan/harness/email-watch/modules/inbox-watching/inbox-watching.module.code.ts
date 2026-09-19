import { recordToAgent } from "akasha/agent/messaging/modules/agent-record/agent-record.module.code.ts"
import { mailbox } from "akasha/alan/google/email/modules/gmail-mailbox/gmail-mailbox.module.code.ts"
import {
  markTold,
  oneRun,
  untoldClaims,
} from "akasha/alan/harness/email-watch/modules/inbox-run/inbox-run.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import {
  sleptUntilStopped,
  stopsOnSignal,
} from "akasha/infrastructure/service/workstation/modules/tick-sleeping/tick-sleeping.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"

const PERSON = optionalEnv("EMAIL_WORKER_PERSON") ?? "alan"
const HANDLER = optionalEnv("EMAIL_WORKER_HANDLER") ?? PERSON
const EVERY_MS = Number(optionalEnv("EMAIL_WORKER_INTERVAL_MS") ?? 60_000)
const SENDER = optionalEnv("EMAIL_WORKER_SENDER") ?? "email-worker"
const ROOT = akashaRoot()

function log(line: string): undefined {
  process.stdout.write(`email-worker: ${line}\n`)
}

type Untold = ReturnType<typeof untoldClaims>[number]

function listed(claims: readonly Untold[]): readonly string[] {
  return claims.map(
    (one) => `- ${one.from ?? "(no sender)"} — ${one.subject ?? "(no subject)"} [${one.rule}]`
  )
}

function bodyOf(claims: readonly Untold[]): string {
  const judgments = claims.filter((one) => one.why !== "notify")
  const told = claims.filter((one) => one.why === "notify")
  return [
    `${claims.length} piece(s) of Alan's mail are waiting on you.`,
    ...(judgments.length === 0
      ? []
      : ["", "Claimed by an agent rule, so the acting is yours to judge:", ...listed(judgments)]),
    ...(told.length === 0
      ? []
      : ["", "A rule asked for him to be told about these:", ...listed(told)]),
    "",
    "Each rule's own `# Rule` section says what it asks; the mail is still in the inbox.",
  ].join("\n")
}

function byHandle(untold: readonly Untold[]): ReadonlyMap<string, readonly Untold[]> {
  const grouped = new Map<string, Untold[]>()
  for (const one of untold) {
    const handle = one.handle ?? HANDLER
    const held = grouped.get(handle)
    if (held === undefined) grouped.set(handle, [one])
    else held.push(one)
  }
  return grouped
}

async function announce(): Promise<void> {
  for (const [handle, claims] of byHandle(untoldClaims())) {
    let messageId: string
    try {
      messageId = await recordToAgent(handle, bodyOf(claims), log)
    } catch (error) {
      log(`telling ${handle} failed, will try again next pass: ${String(error).slice(0, 200)}`)
      continue
    }
    markTold(claims.map((one) => one.messageId))
    log(`told ${handle} about ${claims.length} piece(s) waiting, from ${SENDER}, as ${messageId}`)
  }
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
      await announce()
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
