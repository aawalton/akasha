export const tool = {
  summary: "Send each reminder whose schedule has come due",
  repos: ["instructions"],
} as const

import { type Reminder, everyReminder, nextElapse, takeReminder } from "../tools/lib/reminder-file.ts"
import { type Warrant, writeMessage } from "../tools/lib/message-file.ts"
import { patchUncommitted, readUncommitted } from "../page/uncommitted/uncommitted.ts"

const HELP = `bun services/send-due-reminders.ts — send each reminder whose schedule has come due

pages/page-type/reminder.page-type.md says a reminder is a message sent at the times it names. This is
the clock that turns a due one into a message and nothing else: it writes the message file and
stops, and recipient-resolver does what it already does with any message. Nothing here knows
what a seat is.

SYSTEMD PARSES THE SCHEDULE, NOT THIS. A reminder states its schedule the way systemd states a
calendar, so \`systemd-analyze calendar\` is asked when the next firing is. A second parser here
would be a second answer to a question systemd already answers, and the two would drift.

WHAT IS DUE IS READ FROM THE SIDECAR, NOT FROM THE CLOCK ALONE. Each reminder carries next-at in
its uncommitted sidecar. A reminder first seen here is armed rather than sent — next-at is set
from its schedule and the run moves on — so writing a reminder never fires it retroactively.

A RUN THAT MISSED A FIRING SENDS ONCE. Where next-at has long passed because nothing ran, the
reminder sends once and is armed again from now. Sending once per missed window would turn an
outage into a queue of messages nobody asked for at a moment nobody chose.

A SPENT ONE-SHOT IS TAKEN AWAY. Where a schedule names an absolute time, systemd answers 'never'
once it is past, and the reminder is removed after it sends — the same idiom as a message, where
read is the file's absence. A reminder whose schedule names no time still to come when it is
first seen is named instead and left standing: deleting a page somebody just wrote, without ever
sending it, costs more than residue that is reported on every run.

Usage:
  bun ~/repos/instructions/services/send-due-reminders.ts

  --help  This.
`

const NEXT_AT = "next-at"

function armedAtMs(absolute: string): number | null {
  const held = readUncommitted(absolute)?.[NEXT_AT]
  if (typeof held !== "string") return null
  const ms = Date.parse(held)
  return Number.isFinite(ms) ? ms : null
}

function sendOne(one: Reminder): string | null {
  const warrant: Warrant = one.warrant
  const written = writeMessage({ to: one.to, from: one.from, warrant, body: one.body })
  if (written.kind === "refused") {
    return `${one.relPath} came due and its message was refused: ${written.detail}`
  }
  process.stdout.write(`${one.relPath}\t${written.relPath}\n`)
  return null
}

function main(argv: readonly string[]): number {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const now = Date.now()
  const held: string[] = []
  let sent = 0
  let armed = 0
  let spent = 0
  for (const one of everyReminder()) {
    const elapse = nextElapse(one.schedule)
    if (elapse.kind === "invalid") {
      held.push(`${one.relPath} states \`${one.schedule}\`, which systemd will not read: ${elapse.detail}`)
      continue
    }
    const nextMs = armedAtMs(one.absolute)
    if (nextMs === null) {
      if (elapse.kind === "never") {
        held.push(`${one.relPath} states \`${one.schedule}\`, which names no time still to come`)
        continue
      }
      patchUncommitted(one.absolute, { [NEXT_AT]: new Date(elapse.ms).toISOString() })
      armed += 1
      continue
    }
    if (nextMs > now) continue
    const refused = sendOne(one)
    if (refused !== null) {
      held.push(refused)
      continue
    }
    sent += 1
    if (elapse.kind !== "never") {
      patchUncommitted(one.absolute, { [NEXT_AT]: new Date(elapse.ms).toISOString() })
      continue
    }
    const taken = takeReminder(
      one.to,
      one.id,
      `the reminder to ${one.to} named one time and has sent, so its page goes`
    )
    if (taken.kind === "refused") held.push(`${one.relPath} has sent and stands anyway: ${taken.detail}`)
    else spent += 1
  }
  process.stderr.write(`${sent} sent, ${armed} armed, ${spent} spent and taken away\n`)
  for (const one of held) process.stderr.write(`held: ${one}\n`)
  return held.length === 0 ? 0 : 1
}

if (import.meta.main) process.exit(main(process.argv.slice(2)))
