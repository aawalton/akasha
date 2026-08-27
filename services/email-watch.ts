#!/usr/bin/env bun

import { mailbox } from "../tools/lib/gmail.ts"
import { recordToAgent } from "../tools/lib/agent-record.ts"
import { markTold, onePass, untoldClaims } from "../tools/lib/email-worker.ts"

const PERSON = process.env.EMAIL_WORKER_PERSON ?? "alan"
const HANDLER = process.env.EMAIL_WORKER_HANDLER ?? PERSON
const EVERY_MS = Number(process.env.EMAIL_WORKER_INTERVAL_MS ?? 60_000)
const SENDER = process.env.EMAIL_WORKER_SENDER ?? "email-worker"
const ROOT = process.env.INSTRUCTIONS_ROOT ?? `${process.env.HOME ?? "/nonexistent"}/instructions`

function log(line: string): void {
  process.stdout.write(`email-worker: ${line}\n`)
}

async function announce(): Promise<void> {
  const untold = untoldClaims()
  if (untold.length === 0) return
  const judgments = untold.filter((one) => one.why !== "notify")
  const told = untold.filter((one) => one.why === "notify")
  const body = [
    `${untold.length} piece(s) of Alan's mail are waiting on you.`,
    ...(judgments.length === 0
      ? []
      : [
          "",
          "Claimed by an agent rule, so the acting is yours to judge:",
          ...judgments.map((one) => `- ${one.from ?? "(no sender)"} — ${one.subject ?? "(no subject)"} [${one.rule}]`),
        ]),
    ...(told.length === 0
      ? []
      : ["", "A rule asked for him to be told about these:", ...told.map((one) => `- ${one.from ?? "(no sender)"} — ${one.subject ?? "(no subject)"} [${one.rule}]`)]),
    "",
    "Each rule's own `# Rule` section says what it asks; the mail is still in the inbox.",
  ].join("\n")
  let messageId: string
  try {
    messageId = await recordToAgent(HANDLER, body, log)
  } catch (error) {
    log(`telling ${HANDLER} failed, will try again next pass: ${String(error).slice(0, 200)}`)
    return
  }
  markTold(untold.map((one) => one.messageId))
  log(`told ${HANDLER} about ${untold.length} piece(s) waiting, from ${SENDER}, as ${messageId}`)
}

const stopping = new AbortController()
for (const signal of ["SIGTERM", "SIGINT"] as const) process.on(signal, () => stopping.abort())

const box = await mailbox()
log(`watching ${PERSON}'s mail every ${Math.round(EVERY_MS / 1000)}s`)

while (!stopping.signal.aborted) {
  try {
    const report = await onePass(PERSON, ROOT, box, { dryRun: false })
    if (report.acted > 0 || report.waiting > 0 || report.unclaimed > 0)
      log(`${report.examined} examined, ${report.acted} acted on, ${report.waiting} waiting, ${report.unclaimed} unclaimed`)
    await announce()
  } catch (error) {
    log(`pass failed: ${String(error)}`)
  }
  await new Promise<void>((resolve) => {
    const done = (): void => {
      clearTimeout(timer)
      stopping.signal.removeEventListener("abort", done)
      resolve()
    }
    const timer = setTimeout(done, EVERY_MS)
    stopping.signal.addEventListener("abort", done)
  })
}
log("stopped")
