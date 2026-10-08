import type {
  Mailbox,
  Message,
} from "akasha/alan/google/email/modules/gmail-mailbox/gmail-mailbox.module.code.ts"
import { decide } from "akasha/alan/harness/email-watch/modules/email-rule-deciding/email-rule-deciding.module.code.ts"
import type { Rule } from "akasha/alan/harness/email-watch/modules/email-rule-reading/email-rule-reading.module.code.ts"

const SPAM = "SPAM"

const INBOX = "INBOX"

const LOOKED_BACK_MS = 60 * 60_000

export interface Rescue {
  readonly message: Message
  readonly rule: Rule
}

async function messageOr(box: Mailbox, id: string): Promise<Message | null> {
  try {
    return await box.message(id)
  } catch {
    return null
  }
}

export async function rescued(
  rules: readonly Rule[],
  box: Mailbox,
  now: Date
): Promise<readonly Rescue[]> {
  if (!rules.some((one) => one.rescueFromSpam)) return []
  const rescues: Rescue[] = []
  for (const id of await box.spamIds(new Date(now.getTime() - LOOKED_BACK_MS))) {
    const message = await messageOr(box, id)
    if (message === null || !message.labelIds.includes(SPAM)) continue
    const rule = decide(rules, message)
    if (rule === null || !rule.rescueFromSpam) continue
    await box.modify(id, { add: [INBOX], remove: [SPAM] })
    rescues.push({ message, rule })
  }
  return rescues
}
