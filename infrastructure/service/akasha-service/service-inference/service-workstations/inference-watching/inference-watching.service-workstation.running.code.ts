import { runInferenceWatching } from "akasha/infrastructure/service/akasha-service/service-inference/modules/inference-watching/inference-watching.module.code.ts"

export async function runService(): Promise<void> {
  await runInferenceWatching()
}
