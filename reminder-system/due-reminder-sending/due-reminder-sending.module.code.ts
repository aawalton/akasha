import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import {
  armedAt,
  armFor,
  everyReminder,
  nextElapse,
  type Standing,
  tookReminder,
} from "@akasha/reminder-system/reminder-sending"
import { writeMessage } from "@akasha/seat-system/message-file"

async function sendOne(one: Standing): Promise<string | null> {
  const written = await writeMessage({
    to: one.to,
    from: one.from,
    warrant: "announce",
    body: one.text,
  })
  if (written.kind === "refused") {
    return `${one.path} came due and its message was refused: ${written.detail}`
  }
  process.stdout.write(`${one.path}\t${written.relPath}\n`)
  return null
}

async function main(): Promise<number> {
  const root = akashaRoot()
  const now = Date.now()
  const held: string[] = []
  let sent = 0
  let armed = 0
  let spent = 0
  for (const one of everyReminder(root)) {
    const elapse = nextElapse(one.schedule)
    if (elapse.kind === "unread") {
      held.push(
        `${one.path} states \`${one.schedule}\`, which systemd will not read: ${elapse.said}`
      )
      continue
    }
    const nextMs = armedAt(root, one.path)
    if (nextMs === null) {
      if (elapse.kind === "never") {
        held.push(`${one.path} states \`${one.schedule}\`, which names no time still to come`)
        continue
      }
      armFor(root, one.path, elapse.ms)
      armed += 1
      continue
    }
    if (nextMs > now) continue
    const refused = await sendOne(one)
    if (refused !== null) {
      held.push(refused)
      continue
    }
    sent += 1
    if (elapse.kind !== "never") {
      armFor(root, one.path, elapse.ms)
      continue
    }
    const why = tookReminder(
      root,
      one.path,
      `the reminder to ${one.to} named one time and has sent, so its page goes`
    )
    if (why !== null) held.push(`${one.path} has sent and is there anyway: ${why}`)
    else spent += 1
  }
  process.stderr.write(`${sent} sent, ${armed} armed, ${spent} spent and taken away\n`)
  for (const one of held) process.stderr.write(`held: ${one}\n`)
  return held.length === 0 ? 0 : 1
}

if (import.meta.main) process.exit(await main())
