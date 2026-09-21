import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { EncounterEntities } from "akasha/story/game/encounter/properties/encounter-entities.relation-property.types.ts"
import type { EncounterLocation } from "akasha/story/game/encounter/properties/encounter-location.relation-property.types.ts"
import type { HoldingGame } from "akasha/story/game/properties/holding-game.relation-property.types.ts"
import type { ListedNote } from "akasha/story/game/properties/listed-note.text-property.types.ts"

export type GameEncounter = Page & {
  title: Title
  game: HoldingGame
  note?: ListedNote
  location: EncounterLocation
  entities?: EncounterEntities
}
