import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const puncturingSweep = {
  id: "019e6245-a6f5-76e1-a6db-eabfb1cf9985",
  pageTypeSlug: "temper-skill",
  slug: "puncturing-sweep",
  title: "Puncturing Sweep",
  key: "puncturing-sweep",
  baseName: "Puncturing Strikes",
  description:
    '"Launch a relentless assault, striking up to 6 enemies in front of you three times with your Aedric spear. The spear deals 919 Magic Damage per strike and reduces enemy Movement Speed by 40% for 0.5 seconds.\\n\\nYou heal for 25% of the damage done with this ability."',
  icon: "/esoui/art/icons/ability_templar_reckless_attacks.dds",
  esoSkillId: 27207,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "templar-aedric-spear",
  skillType: "active",
  subcategoryId: "templar-aedric-spear",
} as const satisfies TemperSkill
