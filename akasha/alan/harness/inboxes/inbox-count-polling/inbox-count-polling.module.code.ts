import { dayAfter } from "@akasha/day/day-string"
import { makeGmailClient } from "@akasha/google-email/client"
import { INBOX_LABEL, listMessages } from "@akasha/google-email/messages"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { asking } from "@akasha/pages-system-service/asking"
import type { InboxKey } from "../inbox-keys/inbox-keys.module.code.ts"

const EMAIL_MAX = 100
const TO_DO_PAGE_TYPE_SLUG = "to-do"
const TEMPER_TASK_PAGE_TYPE_SLUG = "temper-task"

const TO_DO_DUE_DATE = "toDoDueDate"
const TO_DO_COMPLETED_AT = "toDoCompletedAt"
const TEMPER_TASK_DUE_DATE = "dueDate"

export type PollLogger = (level: "INFO" | "ERROR", message: string) => void

function errMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

async function pollEmail(): Promise<number> {
  const client = await makeGmailClient()
  const messages = await listMessages(client, {
    labelIds: [INBOX_LABEL],
    max: EMAIL_MAX,
  })
  return messages.length
}

function checkoutRoot(): string {
  return rootFor(resolveRoots(), AKASHA)
}

function howMany(pageTypeSlug: string, where: Readonly<Record<string, unknown>>): number {
  const asked = asking(checkoutRoot(), { pageTypeSlug, where } as never)
  if ("refused" in asked) {
    throw new Error(`counting what is due on ${pageTypeSlug}: ${asked.refused}`)
  }
  return asked.rows.length
}

async function pollToDosDue(dayStr: string): Promise<number> {
  return howMany(TO_DO_PAGE_TYPE_SLUG, {
    [TO_DO_DUE_DATE]: { before: dayAfter(dayStr) },
    [TO_DO_COMPLETED_AT]: { empty: true },
  })
}

async function pollTemperTasksDue(dayStr: string): Promise<number> {
  return howMany(TEMPER_TASK_PAGE_TYPE_SLUG, {
    [TEMPER_TASK_DUE_DATE]: { before: dayAfter(dayStr) },
  })
}

export async function pollInboxCounts(
  dayStr: string,
  log: PollLogger
): Promise<Partial<Record<InboxKey, number>>> {
  const sources: ReadonlyArray<readonly [InboxKey, () => Promise<number>]> = [
    ["email", () => pollEmail()],
    ["tasks", () => pollToDosDue(dayStr)],
    ["temperTasks", () => pollTemperTasksDue(dayStr)],
  ]

  const polled = await Promise.all(
    sources.map(async ([key, run]): Promise<readonly [InboxKey, number | undefined]> => {
      try {
        return [key, await run()] as const
      } catch (err) {
        log("ERROR", `inbox source '${key}' failed (omitted): ${errMessage(err)}`)
        return [key, undefined] as const
      }
    })
  )

  const counts: Partial<Record<InboxKey, number>> = {}
  for (const [key, count] of polled) {
    if (count !== undefined) counts[key] = count
  }
  return counts
}
