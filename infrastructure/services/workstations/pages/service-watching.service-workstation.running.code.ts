import { runServiceWatching } from "akasha/infrastructure/services/workstations/service-watching/service-watching.module.code.ts"

export async function runService(): Promise<void> {
  await runServiceWatching()
}
