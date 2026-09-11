import { runPushNotifying } from "akasha/alan/harness/alanwalton-ios-notification/push-notifying/push-notifying.module.code.ts"

export async function runService(): Promise<void> {
  await runPushNotifying()
}
