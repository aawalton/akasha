import type { OverwhereIvSkill } from "akasha/story/world/pages/syl-a-slime-monster-evolution-litrpg/stories/played/overwhere-iv/mechanics/skills/overwhere-iv-skill.page-type.types.ts"

export const overwhereIvNalaSpearmanship = {
  id: "01a0f36e-9a0b-75ff-a503-9b48f968018f",
  type: "page-type/overwhere-iv-skill",
  slug: "overwhere-iv-nala-spearmanship",
  title: "Spearmanship",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Skill with the spear: thrust, guard and reach.",
  character: "character-player/overwhere-iv-nala",
  skill: "world-skill/overwhere-iv-spearmanship",
  level: 5,
  uses: 0,
} as const satisfies OverwhereIvSkill
