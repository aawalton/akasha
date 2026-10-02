import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OverwhereIvSkillCharacter } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/properties/overwhere-iv-skill-character.relation-property.types.ts"
import type { OverwhereIvSkillLevel } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/properties/overwhere-iv-skill-level.number-property.types.ts"
import type { OverwhereIvSkillReachPaces } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/properties/overwhere-iv-skill-reach-paces.number-property.types.ts"
import type { OverwhereIvSkillSkill } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/properties/overwhere-iv-skill-skill.relation-property.types.ts"
import type { OverwhereIvSkillUses } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/properties/overwhere-iv-skill-uses.number-property.types.ts"

export type OverwhereIvSkill = WorldSkill & {
  character: OverwhereIvSkillCharacter
  skill: OverwhereIvSkillSkill
  level: OverwhereIvSkillLevel
  reachPaces?: OverwhereIvSkillReachPaces
  uses?: OverwhereIvSkillUses
}
