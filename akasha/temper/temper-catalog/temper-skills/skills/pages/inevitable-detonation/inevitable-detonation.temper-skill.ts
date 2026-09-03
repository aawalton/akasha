import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const inevitableDetonation = {
  id: "019e6251-4cc7-78cf-8965-d3f9d5ed26e8",
  pageTypeSlug: "temper-skill",
  slug: "inevitable-detonation",
  title: "Inevitable Detonation",
  key: "inevitable-detonation",
  baseName: "Magicka Detonation",
  description:
    '"Curse an enemy with a magical bomb that explodes after 4 seconds, dealing 449 Magic Damage to all enemies in the area.\\n\\nIf the bomb is dispelled or removed early, the explosion is triggered immediately.\\n\\nEach enemy within the bomb\'s radius increases the damage by 100%."',
  icon: "/esoui/art/icons/ability_ava_inevitable_detonation.dds",
  esoSkillId: 63293,
  isMorph: true,
  learnedLevel: 7,
  lineRankNeeded: 7,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-assault",
  skillType: "active",
  subcategoryId: "alliance-war-assault",
} as const satisfies TemperSkill
