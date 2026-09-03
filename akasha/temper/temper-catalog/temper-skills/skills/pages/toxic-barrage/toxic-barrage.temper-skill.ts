import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const toxicBarrage = {
  id: "019e6226-011a-7864-b768-1fa3fee7242f",
  pageTypeSlug: "temper-skill",
  slug: "toxic-barrage",
  title: "Toxic Barrage",
  key: "toxic-barrage",
  baseName: "Rapid Fire",
  description:
    '"Unleash a barrage of arrows at an enemy, dealing 17415 Poison Damage over 4 seconds. \\n\\nAfter dealing damage you poison the enemy, dealing an additional 9990 Poison Damage over 8 seconds after a 1 second delay.  \\n\\nYou can move at full speed and are immune to all disabling effects while channeling this attack.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_bow_006_b.dds",
  esoSkillId: 86603,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-bow",
  skillType: "ultimate",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
