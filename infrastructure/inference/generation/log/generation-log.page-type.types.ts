import type { GenerationAudios } from "akasha/infrastructure/inference/generation/log/properties/generation-audios.file-property.types.ts"
import type { GenerationRuns } from "akasha/infrastructure/inference/generation/log/properties/generation-runs.file-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type GenerationLog = Page & {
  runs: GenerationRuns
  audios?: GenerationAudios
}
