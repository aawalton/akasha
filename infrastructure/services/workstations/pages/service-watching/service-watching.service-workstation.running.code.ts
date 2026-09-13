import { runServiceWatching } from "akasha/infrastructure/services/workstations/modules/service-watching/service-watching.module.code.ts"

export async function runService(): Promise<void> {
  await runServiceWatching()
}
