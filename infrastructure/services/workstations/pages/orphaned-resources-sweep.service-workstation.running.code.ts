import { runOrphanSweeping } from "akasha/infrastructure/cluster/manifests/modules/orphan-sweeping/orphan-sweeping.module.code.ts"

export async function runService(): Promise<void> {
  await runOrphanSweeping()
}
