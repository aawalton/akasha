import {
  type NotifyInput,
  writeNotification,
} from "akasha/alan/harness/notification-feeds/rows/notification-feed-rows.module.code.ts"

const NOTIFY_WRITER = "notify"

export const ALAN_PERSON = "alan"

export async function notify(
  personSlug: string,
  input: NotifyInput,
  done: string[] = []
): Promise<void> {
  await writeNotification(
    personSlug,
    input,
    input.source ?? NOTIFY_WRITER,
    undefined,
    undefined,
    done
  )
}
