import { runClusterWatching } from "akasha/infrastructure/service/cluster/modules/cluster-watching/cluster-watching.module.code.ts"

export async function runService(): Promise<void> {
  await Promise.resolve(runClusterWatching())
}
