import { runMemoryReaper } from "akasha/infrastructure/memory/reaping/modules/memory-reaper-running/memory-reaper-running.module.code.ts"

export async function runService(): Promise<void> {
  await runMemoryReaper()
}
