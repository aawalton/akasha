import { runOrphanSweeping } from "akasha/infrastructure/cluster/manifest/modules/orphan-sweeping/orphan-sweeping.module.code.ts"

export async function runService(): Promise<void> {
  await runOrphanSweeping()
}
