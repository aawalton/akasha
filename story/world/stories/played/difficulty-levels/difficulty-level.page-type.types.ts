import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { FailureCeiling } from "akasha/story/world/stories/played/difficulty-levels/properties/failure-ceiling.standard-agent-english-property.types.ts"
import type { GameMasterStance } from "akasha/story/world/stories/played/difficulty-levels/properties/game-master-stance.standard-agent-english-property.types.ts"
import type { OddsModifier } from "akasha/story/world/stories/played/difficulty-levels/properties/odds-modifier.number-property.types.ts"

export type DifficultyLevel = Page & {
  title: Title
  oddsModifier: OddsModifier
  failureCeiling: FailureCeiling
  gameMasterStance: GameMasterStance
}
