import type { AudioBytes } from "akasha/infrastructure/inference/generation/audio/properties/audio-bytes.file-property.types.ts"
import type { InferenceModel } from "akasha/infrastructure/inference/generation/audio/properties/inference-model.text-property.types.ts"
import type { InferenceOperation } from "akasha/infrastructure/inference/generation/audio/properties/inference-operation.text-property.types.ts"
import type { InferenceService } from "akasha/infrastructure/inference/generation/audio/properties/inference-service.text-property.types.ts"
import type { SpokenText } from "akasha/infrastructure/inference/generation/audio/properties/spoken-text.text-property.types.ts"
import type { VoiceInstruct } from "akasha/infrastructure/inference/generation/audio/properties/voice-instruct.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type Audio = Page & {
  bytes?: AudioBytes
  service?: InferenceService
  operation?: InferenceOperation
  model?: InferenceModel
  text?: SpokenText
  instruct?: VoiceInstruct
}
