import { runClusterWatching } from "akasha/infrastructure/service/akasha-service/service-cluster/modules/cluster-watching/cluster-watching.module.code.ts"

export async function runService(): Promise<void> {
  await Promise.resolve(runClusterWatching())
}
