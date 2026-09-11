import { runInboxCountWatch } from "akasha/alan/harness/inboxes/count-watch/inbox-count-watch.module.code.ts"

const SITE = "https://alanwalton.com"

const NEVER: Promise<never> = new Promise(() => {})

export async function runService(): Promise<never> {
  runInboxCountWatch(SITE)
  return await NEVER
}
