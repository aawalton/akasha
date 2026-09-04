import {
  type NotifyInput,
  writeNotification,
} from "../notification-feed-rows/notification-feed-rows.module.code.ts"

const NOTIFY_WRITER = "notify"

export const ALAN_PERSON = "alan"

export async function notify(personSlug: string, input: NotifyInput): Promise<void> {
  await writeNotification(personSlug, input, input.source ?? NOTIFY_WRITER)
}
