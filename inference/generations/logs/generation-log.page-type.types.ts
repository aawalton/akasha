import type { Page } from "../../../pages/page.page-type.ts"
import type { GenerationAudios } from "./properties/generation-audios.file-property.ts"
import type { GenerationImages } from "./properties/generation-images.file-property.ts"
import type { GenerationRuns } from "./properties/generation-runs.file-property.ts"

export type GenerationLog = Page & {
  runs: GenerationRuns
  images?: GenerationImages
  audios?: GenerationAudios
}
