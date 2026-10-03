import type { HeldSkill } from "akasha/story/world/mechanics/skills/character-skill/properties/held-skill.relation-property.types.ts"
import type { SkillCharacter } from "akasha/story/world/mechanics/skills/character-skill/properties/skill-character.relation-property.types.ts"
import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export type CharacterSkill = WorldSkill & {
  character: SkillCharacter
  skill: HeldSkill
}
