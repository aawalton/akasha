import { runOrphanSweeping } from "akasha/infrastructure/cluster/manifests/orphan-sweeping/orphan-sweeping.module.code.ts"

export async function runService(): Promise<void> {
  await runOrphanSweeping()
}
