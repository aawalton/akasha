import { runPushNotifying } from "akasha/alan/harness/alanwalton-ios-notification/modules/push-notifying/push-notifying.module.code.ts"

export async function runService(): Promise<void> {
  await runPushNotifying()
}
