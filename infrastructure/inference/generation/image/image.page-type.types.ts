import type { Prompt } from "akasha/agent/model/test/properties/prompt.text-property.types.ts"
import type { EsoDay } from "akasha/infrastructure/inference/generation/image/properties/eso-day.calendar-date-property.types.ts"
import type { ImageAgeTags } from "akasha/infrastructure/inference/generation/image/properties/image-age-tags.multi-relation-property.types.ts"
import type { ImageBytes } from "akasha/infrastructure/inference/generation/image/properties/image-bytes.file-property.types.ts"
import type { ImageEthnicityTags } from "akasha/infrastructure/inference/generation/image/properties/image-ethnicity-tags.multi-relation-property.types.ts"
import type { ImageFantasyTags } from "akasha/infrastructure/inference/generation/image/properties/image-fantasy-tags.multi-relation-property.types.ts"
import type { ImagePersona } from "akasha/infrastructure/inference/generation/image/properties/image-persona.relation-property.types.ts"
import type { ImagePoseTags } from "akasha/infrastructure/inference/generation/image/properties/image-pose-tags.multi-relation-property.types.ts"
import type { ImageSettingTags } from "akasha/infrastructure/inference/generation/image/properties/image-setting-tags.multi-relation-property.types.ts"
import type { ImageSubjects } from "akasha/infrastructure/inference/generation/image/properties/image-subjects.text-property.types.ts"
import type { ImageWardrobeTags } from "akasha/infrastructure/inference/generation/image/properties/image-wardrobe-tags.multi-relation-property.types.ts"
import type { InferenceGuidance } from "akasha/infrastructure/inference/generation/image/properties/inference-guidance.number-property.types.ts"
import type { InferenceHeight } from "akasha/infrastructure/inference/generation/image/properties/inference-height.number-property.types.ts"
import type { InferenceQuantize } from "akasha/infrastructure/inference/generation/image/properties/inference-quantize.number-property.types.ts"
import type { InferenceSeed } from "akasha/infrastructure/inference/generation/image/properties/inference-seed.number-property.types.ts"
import type { InferenceSteps } from "akasha/infrastructure/inference/generation/image/properties/inference-steps.number-property.types.ts"
import type { InferenceWidth } from "akasha/infrastructure/inference/generation/image/properties/inference-width.number-property.types.ts"
import type { InputImage } from "akasha/infrastructure/inference/generation/image/properties/input-image.relation-property.types.ts"
import type { ReferenceImages } from "akasha/infrastructure/inference/generation/image/properties/reference-images.multi-relation-property.types.ts"
import type { ServiceVersions } from "akasha/infrastructure/inference/generation/image/properties/service-versions.text-property.types.ts"
import type { UpscaleResolution } from "akasha/infrastructure/inference/generation/image/properties/upscale-resolution.text-property.types.ts"
import type { UpscaleSoftness } from "akasha/infrastructure/inference/generation/image/properties/upscale-softness.number-property.types.ts"
import type { InferenceModel } from "akasha/infrastructure/inference/generation/properties/inference-model.text-property.types.ts"
import type { InferenceOperation } from "akasha/infrastructure/inference/generation/properties/inference-operation.text-property.types.ts"
import type { InferenceService } from "akasha/infrastructure/inference/generation/properties/inference-service.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { RelationshipLevel } from "akasha/persona/closeness-level/properties/relationship-level.relation-property.types.ts"

export type Image = Page & {
  bytes?: ImageBytes
  persona?: ImagePersona
  relationshipLevel?: RelationshipLevel
  esoDay?: EsoDay
  service?: InferenceService
  operation?: InferenceOperation
  model?: InferenceModel
  seed?: InferenceSeed
  steps?: InferenceSteps
  guidance?: InferenceGuidance
  width?: InferenceWidth
  height?: InferenceHeight
  quantize?: InferenceQuantize
  softness?: UpscaleSoftness
  resolution?: UpscaleResolution
  inputImage?: InputImage
  referenceImages?: ReferenceImages
  serviceVersions?: ServiceVersions
  prompt?: Prompt
  settingTags?: ImageSettingTags
  poseTags?: ImagePoseTags
  wardrobeTags?: ImageWardrobeTags
  fantasyTags?: ImageFantasyTags
  ethnicityTags?: ImageEthnicityTags
  ageTags?: ImageAgeTags
  subjects?: ImageSubjects
}
