import type { GenerationAudios } from "akasha/inference/generations/logs/properties/generation-audios.file-property.ts"
import type { GenerationImages } from "akasha/inference/generations/logs/properties/generation-images.file-property.ts"
import type { GenerationRuns } from "akasha/inference/generations/logs/properties/generation-runs.file-property.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type GenerationLog = Page & {
  runs: GenerationRuns
  images?: GenerationImages
  audios?: GenerationAudios
}
