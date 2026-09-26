import {
  INFERENCE_OPERATIONS,
  INFERENCE_SERVICES,
  type InferenceOperation,
  type InferenceService,
  SERVICE_VERSIONS,
  ServiceVersionsSchema,
} from "akasha/infrastructure/inference/run/modules/services/inference-run-services.module.code.ts"
import { z } from "zod"

const InferenceRunRecordSchema = z.object({
  title: z.string(),
  service: z.enum(INFERENCE_SERVICES),
  operation: z.enum(INFERENCE_OPERATIONS),
  model: z.string(),
  host: z.string(),
  commandLine: z.string(),
  startedAt: z.string(),
  serviceVersions: ServiceVersionsSchema,
  prompt: z.string().optional(),
  seed: z.number().optional(),
  steps: z.number().optional(),
  guidance: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  size: z.string().optional(),
  weight: z.number().optional(),
  negativePrompt: z.string().optional(),
  quantize: z.number().optional(),
  resolution: z.string().optional(),
  softness: z.number().optional(),
  flattenColor: z.string().optional(),
  inputImagePath: z.string().optional(),
  inputImageSha256: z.string().optional(),
  referenceImagePaths: z.array(z.string()).optional(),
  referenceImageSha256s: z.array(z.string()).optional(),
  inputVideoPath: z.string().optional(),
  inputVideoSha256: z.string().optional(),
  frames: z.number().optional(),
  fps: z.number().optional(),
  lightning: z.boolean().optional(),
  endImagePath: z.string().optional(),
  endImageSha256: z.string().optional(),
  instruct: z.string().optional(),
  text: z.string().optional(),
  lang: z.string().optional(),
  refAudioPath: z.string().optional(),
  refText: z.string().optional(),
  temperature: z.number().optional(),
  topP: z.number().optional(),
  topK: z.number().optional(),
  repetitionPenalty: z.number().optional(),
  maxTokens: z.number().optional(),
  lyrics: z.string().optional(),
  duration: z.number().optional(),
  vocalLanguage: z.string().optional(),
  ditModel: z.string().optional(),
  lmModel: z.string().optional(),
})
export type InferenceRunRecord = z.infer<typeof InferenceRunRecordSchema>

interface BuildInferenceRunRecordInput {
  readonly service: InferenceService
  readonly operation: InferenceOperation
  readonly model: string
  readonly host: string
  readonly commandLine: string
  readonly startedAt: string
  readonly title?: string
  readonly prompt?: string
  readonly seed?: number
  readonly steps?: number
  readonly guidance?: number
  readonly width?: number
  readonly height?: number
  readonly size?: string
  readonly weight?: number
  readonly negativePrompt?: string
  readonly quantize?: number
  readonly resolution?: string
  readonly softness?: number
  readonly flattenColor?: string
  readonly inputImagePath?: string
  readonly inputImageSha256?: string
  readonly referenceImagePaths?: readonly string[]
  readonly referenceImageSha256s?: readonly string[]
  readonly inputVideoPath?: string
  readonly inputVideoSha256?: string
  readonly frames?: number
  readonly fps?: number
  readonly lightning?: boolean
  readonly endImagePath?: string
  readonly endImageSha256?: string
  readonly instruct?: string
  readonly text?: string
  readonly lang?: string
  readonly refAudioPath?: string
  readonly refText?: string
  readonly temperature?: number
  readonly topP?: number
  readonly topK?: number
  readonly repetitionPenalty?: number
  readonly maxTokens?: number
  readonly lyrics?: string
  readonly duration?: number
  readonly vocalLanguage?: string
  readonly ditModel?: string
  readonly lmModel?: string
}

export function buildInferenceRunRecord(input: BuildInferenceRunRecordInput): InferenceRunRecord {
  const title = input.title ?? `${input.service} ${input.operation} @ ${input.startedAt}`
  return InferenceRunRecordSchema.parse({
    title,
    service: input.service,
    operation: input.operation,
    model: input.model,
    host: input.host,
    commandLine: input.commandLine,
    startedAt: input.startedAt,
    serviceVersions: SERVICE_VERSIONS[input.service],
    ...(input.prompt !== undefined ? { prompt: input.prompt } : {}),
    ...(input.seed !== undefined ? { seed: input.seed } : {}),
    ...(input.steps !== undefined ? { steps: input.steps } : {}),
    ...(input.guidance !== undefined ? { guidance: input.guidance } : {}),
    ...(input.width !== undefined ? { width: input.width } : {}),
    ...(input.height !== undefined ? { height: input.height } : {}),
    ...(input.size !== undefined ? { size: input.size } : {}),
    ...(input.weight !== undefined ? { weight: input.weight } : {}),
    ...(input.negativePrompt !== undefined ? { negativePrompt: input.negativePrompt } : {}),
    ...(input.quantize !== undefined ? { quantize: input.quantize } : {}),
    ...(input.resolution !== undefined ? { resolution: input.resolution } : {}),
    ...(input.softness !== undefined ? { softness: input.softness } : {}),
    ...(input.flattenColor !== undefined ? { flattenColor: input.flattenColor } : {}),
    ...(input.inputImagePath !== undefined ? { inputImagePath: input.inputImagePath } : {}),
    ...(input.inputImageSha256 !== undefined ? { inputImageSha256: input.inputImageSha256 } : {}),
    ...(input.referenceImagePaths !== undefined
      ? { referenceImagePaths: input.referenceImagePaths }
      : {}),
    ...(input.referenceImageSha256s !== undefined
      ? { referenceImageSha256s: input.referenceImageSha256s }
      : {}),
    ...(input.inputVideoPath !== undefined ? { inputVideoPath: input.inputVideoPath } : {}),
    ...(input.inputVideoSha256 !== undefined ? { inputVideoSha256: input.inputVideoSha256 } : {}),
    ...(input.frames !== undefined ? { frames: input.frames } : {}),
    ...(input.fps !== undefined ? { fps: input.fps } : {}),
    ...(input.lightning !== undefined ? { lightning: input.lightning } : {}),
    ...(input.endImagePath !== undefined ? { endImagePath: input.endImagePath } : {}),
    ...(input.endImageSha256 !== undefined ? { endImageSha256: input.endImageSha256 } : {}),
    ...(input.instruct !== undefined ? { instruct: input.instruct } : {}),
    ...(input.text !== undefined ? { text: input.text } : {}),
    ...(input.lang !== undefined ? { lang: input.lang } : {}),
    ...(input.refAudioPath !== undefined ? { refAudioPath: input.refAudioPath } : {}),
    ...(input.refText !== undefined ? { refText: input.refText } : {}),
    ...(input.temperature !== undefined ? { temperature: input.temperature } : {}),
    ...(input.topP !== undefined ? { topP: input.topP } : {}),
    ...(input.topK !== undefined ? { topK: input.topK } : {}),
    ...(input.repetitionPenalty !== undefined
      ? { repetitionPenalty: input.repetitionPenalty }
      : {}),
    ...(input.maxTokens !== undefined ? { maxTokens: input.maxTokens } : {}),
    ...(input.lyrics !== undefined ? { lyrics: input.lyrics } : {}),
    ...(input.duration !== undefined ? { duration: input.duration } : {}),
    ...(input.vocalLanguage !== undefined ? { vocalLanguage: input.vocalLanguage } : {}),
    ...(input.ditModel !== undefined ? { ditModel: input.ditModel } : {}),
    ...(input.lmModel !== undefined ? { lmModel: input.lmModel } : {}),
  })
}
