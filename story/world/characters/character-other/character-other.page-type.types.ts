import type { CharacterPersona } from "akasha/story/world/characters/character-other/properties/character-persona.relation-property.types.ts"
import type { CharacterPlace } from "akasha/story/world/characters/properties/character-place.relation-property.types.ts"
import type { CharacterStory } from "akasha/story/world/characters/properties/character-story.relation-property.types.ts"
import type { CoffeeShopDateDoing } from "akasha/story/world/characters/properties/coffee-shop-date-doing.text-property.types.ts"
import type { CoffeeShopDateFeeling } from "akasha/story/world/characters/properties/coffee-shop-date-feeling.text-property.types.ts"
import type { CoffeeShopDateKnowing } from "akasha/story/world/characters/properties/coffee-shop-date-knowing.text-property.types.ts"
import type { CoffeeShopDatePerceiving } from "akasha/story/world/characters/properties/coffee-shop-date-perceiving.text-property.types.ts"
import type { CoffeeShopDateTurnStates } from "akasha/story/world/characters/properties/coffee-shop-date-turn-states.file-property.types.ts"
import type { CoffeeShopDateWanting } from "akasha/story/world/characters/properties/coffee-shop-date-wanting.text-property.types.ts"
import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export type CharacterOther = WorldCharacter & {
  story: CharacterStory
  place?: CharacterPlace
  persona?: CharacterPersona
  perceiving?: CoffeeShopDatePerceiving
  knowing?: CoffeeShopDateKnowing
  feeling?: CoffeeShopDateFeeling
  wanting?: CoffeeShopDateWanting
  doing?: CoffeeShopDateDoing
  turnStates?: CoffeeShopDateTurnStates
}
