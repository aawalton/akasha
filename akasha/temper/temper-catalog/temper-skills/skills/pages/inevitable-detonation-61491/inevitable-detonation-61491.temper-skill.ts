import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const inevitableDetonation61491 = {
  id: "01a05fd0-dcc4-70a6-a4a2-2e1490cc34a6",
  pageTypeSlug: "temper-skill",
  slug: "inevitable-detonation-61491",
  title: "Inevitable Detonation",
  key: "inevitable-detonation-61491",
  baseName: "Magicka Detonation",
  description:
    '"Curse an enemy with a magical bomb that explodes after |cffffff4|r seconds, dealing |cffffff1652|r Magic Damage to all enemies in the area.\\n\\nIf the bomb is dispelled or removed early, the explosion is triggered immediately.\\n\\nEach enemy within the bomb\'s radius increases the damage by |cffffff100|r%."',
  icon: "/esoui/art/icons/ability_ava_inevitable_detonation.dds",
  esoSkillId: 61491,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 7,
  morphIndex: 1,
  rank: 7,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
