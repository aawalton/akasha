import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const toxicBarrage85257 = {
  id: "019e6f53-a851-7e3f-b618-3662eaa3805e",
  pageTypeSlug: "temper-skill",
  slug: "toxic-barrage-85257",
  title: "Toxic Barrage",
  key: "toxic-barrage-85257",
  baseName: "Rapid Fire",
  description:
    '"Unleash a barrage of arrows at an enemy, dealing |cffffff60570|r Poison Damage over |cffffff4|r seconds. \\n\\nAfter dealing damage you poison the enemy, dealing an additional |cffffff32790|r Poison Damage over |cffffff8|r seconds after a |cffffff1|r second delay.  \\n\\nYou can move at full speed and are immune to all disabling effects while channeling this attack.\\n\\nThis ability is considered direct damage."',
  icon: "/esoui/art/icons/ability_bow_006_b.dds",
  esoSkillId: 85257,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 50,
  morphIndex: 1,
  rank: 50,
  skillLineId: "weapon-bow",
  skillType: "ultimate",
  subcategoryId: "weapon-bow",
} as const satisfies TemperSkill
