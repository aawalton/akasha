import type { SkillAttribute } from "akasha/story/world/mechanics/skills/properties/skill-attribute.relation-property.types.ts"
import type { SkillDurationMinutes } from "akasha/story/world/mechanics/skills/properties/skill-duration-minutes.number-property.types.ts"
import type { SkillExperience } from "akasha/story/world/mechanics/skills/properties/skill-experience.number-property.types.ts"
import type { SkillManaCost } from "akasha/story/world/mechanics/skills/properties/skill-mana-cost.number-property.types.ts"
import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export type WorldSkill = WorldMechanic & {
  manaCost?: SkillManaCost
  durationMinutes?: SkillDurationMinutes
  experience?: SkillExperience
  attribute?: SkillAttribute
}
