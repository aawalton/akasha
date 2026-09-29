import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"
import type { OverwhereIiTalentCharacter } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/talents/properties/overwhere-ii-talent-character.relation-property.types.ts"
import type { OverwhereIiTalentDepth } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/talents/properties/overwhere-ii-talent-depth.text-property.types.ts"
import type { OverwhereIiTalentDraw } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/talents/properties/overwhere-ii-talent-draw.number-property.types.ts"
import type { OverwhereIiTalentReachFeet } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/talents/properties/overwhere-ii-talent-reach-feet.number-property.types.ts"
import type { OverwhereIiTalentTalent } from "akasha/story/world/pages/sovereign-sight-progression-fantasy-cultivation/stories/played/overwhere-ii/mechanics/talents/properties/overwhere-ii-talent-talent.relation-property.types.ts"

export type OverwhereIiTalent = WorldSkill & {
  character: OverwhereIiTalentCharacter
  talent: OverwhereIiTalentTalent
  depth: OverwhereIiTalentDepth
  reachFeet: OverwhereIiTalentReachFeet
  draw: OverwhereIiTalentDraw
}
