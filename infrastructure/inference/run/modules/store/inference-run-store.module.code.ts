import {
  defaultPersistAudioDeps,
  persistInferenceAudio,
  shouldPersistAudio,
} from "akasha/infrastructure/inference/run/modules/persist-audio/persist-audio.module.code.ts"
import {
  defaultPersistImageDeps,
  persistInferenceImage,
  shouldPersistImage,
} from "akasha/infrastructure/inference/run/modules/persist-image/persist-image.module.code.ts"
import type { InferenceRunRecord } from "akasha/infrastructure/inference/run/modules/record/inference-run-record.module.code.ts"

interface InferenceRunResult {
  readonly outputPath: string
  readonly outputBytes: Uint8Array
}

interface RecordInferenceRunOptions {
  readonly persist?: boolean
}

export async function recordInferenceRun(
  record: InferenceRunRecord,
  run: () => Promise<InferenceRunResult>,
  done: string[],
  opts: RecordInferenceRunOptions = {}
): Promise<InferenceRunResult> {
  const result = await run()
  if (shouldPersistImage(record.operation, opts.persist)) {
    await persistInferenceImage(defaultPersistImageDeps(), record, result.outputBytes, done)
  } else if (shouldPersistAudio(record.operation, opts.persist)) {
    await persistInferenceAudio(defaultPersistAudioDeps(), record, result.outputBytes, done)
  }

  return result
}
