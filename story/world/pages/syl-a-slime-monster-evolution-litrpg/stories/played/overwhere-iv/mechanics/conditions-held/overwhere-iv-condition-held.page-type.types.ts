import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"
import type { OverwhereIvConditionHeldCharacter } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/conditions-held/properties/overwhere-iv-condition-held-character.relation-property.types.ts"
import type { OverwhereIvConditionHeldCondition } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/conditions-held/properties/overwhere-iv-condition-held-condition.relation-property.types.ts"

export type OverwhereIvConditionHeld = WorldCondition & {
  character: OverwhereIvConditionHeldCharacter
  condition: OverwhereIvConditionHeldCondition
}
