import {
  generationLogSlug,
  landRow,
  mergeRow,
} from "akasha/infrastructure/inference/runs/generation-log/generation-log.module.code.ts"
import {
  defaultPersistAudioDeps,
  persistInferenceAudio,
  shouldPersistAudio,
} from "akasha/infrastructure/inference/runs/persist-audio/persist-audio.module.code.ts"
import {
  defaultPersistImageDeps,
  persistInferenceImage,
  shouldPersistImage,
} from "akasha/infrastructure/inference/runs/persist-image/persist-image.module.code.ts"
import {
  buildFinishPatch,
  type FinishInferenceRunInput,
  type InferenceRunRecord,
} from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { INFERENCE_RUN_PAGE_TYPE_SLUG } from "akasha/infrastructure/inference/runs/services/inference-run-services.module.code.ts"
import { sha256Hex } from "akasha/utils/hashing/sha256-hex/sha256-hex.module.code.ts"
import { JsonSchema } from "akasha/utils/narrow/json-schema/json-schema.module.code.ts"
import { z } from "zod"

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

export function openedSaid(pageId: string): string {
  return `opened run ${pageId} in the \`${generationLogSlug()}\` log`
}

export function closedSaid(pageId: string, status: string): string {
  return `closed run ${pageId} as ${status}`
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
  done: string[],
  opts: RecordInferenceRunOptions = {}
): Promise<InferenceRunResult> {
  const pageId = await startInferenceRun(record)
  done.push(openedSaid(pageId))
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
    done.push(closedSaid(pageId, "completed"))
  } catch (err) {
    await finishInferenceRun(pageId, {
      status: "failed",
      completedAt: new Date().toISOString(),
      durationMs: Date.now() - startMs,
      errorMessage: err instanceof Error ? err.message : String(err),
    })
    done.push(closedSaid(pageId, "failed"))
    throw err
  }

  if (shouldPersistImage(record.operation, opts.persist)) {
    await persistInferenceImage(
      defaultPersistImageDeps(done),
      {
        record,
        inferenceRunId: pageId,
        outputPath: result.outputPath,
        outputBytes: result.outputBytes,
      },
      done
    )
  } else if (shouldPersistAudio(record.operation, opts.persist)) {
    await persistInferenceAudio(
      defaultPersistAudioDeps(done),
      {
        record,
        inferenceRunId: pageId,
        outputPath: result.outputPath,
        outputBytes: result.outputBytes,
      },
      done
    )
  }

  return result
}
