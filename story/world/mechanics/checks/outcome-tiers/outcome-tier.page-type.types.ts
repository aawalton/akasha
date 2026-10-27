import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { ScoreFloor } from "akasha/story/world/mechanics/checks/outcome-tiers/properties/score-floor.number-property.types.ts"
import type { Succeeds } from "akasha/story/world/mechanics/checks/outcome-tiers/properties/succeeds.boolean-property.types.ts"
import type { WriterInstruction } from "akasha/story/world/mechanics/checks/outcome-tiers/properties/writer-instruction.standard-agent-english-property.types.ts"

export type OutcomeTier = Page & {
  title: Title
  scoreFloor?: ScoreFloor
  succeeds: Succeeds
  writerInstruction: WriterInstruction
}
