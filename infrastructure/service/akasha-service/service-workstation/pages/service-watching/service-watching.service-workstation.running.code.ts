import { runServiceWatching } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-watching/service-watching.module.code.ts"

export async function runService(): Promise<void> {
  await runServiceWatching()
}
