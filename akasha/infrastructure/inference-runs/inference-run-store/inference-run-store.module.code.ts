import { JsonSchema } from "@akasha/utils-narrow/json-schema"
import { z } from "zod"
import { landRow, mergeRow } from "../generation-log/generation-log.module.code.ts"
import {
  buildFinishPatch,
  type FinishInferenceRunInput,
  type InferenceRunRecord,
  sha256Hex,
} from "../inference-run-record/inference-run-record.module.code.ts"
import { INFERENCE_RUN_PAGE_TYPE_SLUG } from "../inference-run-services/inference-run-services.module.code.ts"
import {
  defaultPersistAudioDeps,
  persistInferenceAudio,
  shouldPersistAudio,
} from "../persist-audio/persist-audio.module.code.ts"
import {
  defaultPersistImageDeps,
  persistInferenceImage,
  shouldPersistImage,
} from "../persist-image/persist-image.module.code.ts"

const RowValuesSchema = z.record(z.string(), JsonSchema)

export async function startInferenceRun(record: InferenceRunRecord): Promise<string> {
  return landRow(INFERENCE_RUN_PAGE_TYPE_SLUG, RowValuesSchema.parse(record))
}

export async function finishInferenceRun(
  pageId: string,
  outcome: FinishInferenceRunInput
): Promise<void> {
  await mergeRow(
    INFERENCE_RUN_PAGE_TYPE_SLUG,
    pageId,
    RowValuesSchema.parse(buildFinishPatch(outcome))
  )
}

export interface InferenceRunResult {
  readonly outputPath: string
  readonly outputBytes: Uint8Array
  readonly identityCosine?: number
}

export interface RecordInferenceRunOptions {
  readonly persist?: boolean
}

export async function recordInferenceRun(
  record: InferenceRunRecord,
  run: () => Promise<InferenceRunResult>,
  opts: RecordInferenceRunOptions = {}
): Promise<InferenceRunResult> {
  const pageId = await startInferenceRun(record)
  const startMs = Date.now()
  let result: InferenceRunResult
  try {
    result = await run()
    const isAudio =
      record.operation === "voice-design" ||
      record.operation === "voice-clone" ||
      record.operation === "music"
    await finishInferenceRun(pageId, {
      status: "completed",
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - startMs,
      ...(isAudio
        ? {
            outputAudioPath: result.outputPath,
            outputAudioSha256: sha256Hex(result.outputBytes),
          }
        : {
            outputImagePath: result.outputPath,
            outputImageSha256: sha256Hex(result.outputBytes),
          }),
      ...(result.identityCosine !== undefined ? { identityCosine: result.identityCosine } : {}),
    })
  } catch (err) {
    await finishInferenceRun(pageId, {
      status: "failed",
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - startMs,
      errorMessage: err instanceof Error ? err.message : String(err),
    })
    throw err
  }

  if (shouldPersistImage(record.operation, opts.persist)) {
    await persistInferenceImage(defaultPersistImageDeps(), {
      record,
      inferenceRunId: pageId,
      outputPath: result.outputPath,
      outputBytes: result.outputBytes,
    })
  } else if (shouldPersistAudio(record.operation, opts.persist)) {
    await persistInferenceAudio(defaultPersistAudioDeps(), {
      record,
      inferenceRunId: pageId,
      outputPath: result.outputPath,
      outputBytes: result.outputBytes,
    })
  }

  return result
}
