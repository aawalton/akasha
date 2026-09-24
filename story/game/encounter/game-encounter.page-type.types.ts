import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { DroppedReward } from "akasha/story/game/encounter/properties/dropped-reward.text-property.types.ts"
import type { EncounterCharacters } from "akasha/story/game/encounter/properties/encounter-characters.multi-relation-property.types.ts"
import type { EncounterGates } from "akasha/story/game/encounter/properties/encounter-gates.record-property.types.ts"
import type { EncounterLocation } from "akasha/story/game/encounter/properties/encounter-location.relation-property.types.ts"
import type { EncounterTrigger } from "akasha/story/game/encounter/properties/encounter-trigger.text-property.types.ts"
import type { ExperienceReward } from "akasha/story/game/encounter/properties/experience-reward.number-property.types.ts"
import type { ReadableTrait } from "akasha/story/game/encounter/properties/readable-trait.text-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"
import type { ListedNote } from "akasha/story/game/properties/listed-note.text-property.types.ts"

export type GameEncounter = Page & {
  title: Title
  game: HoldingGame
  note?: ListedNote
  location: EncounterLocation
  characters?: EncounterCharacters
  readableTrait?: ReadableTrait
  trigger?: EncounterTrigger
  experience?: ExperienceReward
  drop?: DroppedReward
  gates?: EncounterGates
}
