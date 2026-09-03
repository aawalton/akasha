import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const brawler = {
  id: "019e6226-00da-73ba-b733-71ae9a655794",
  pageTypeSlug: "temper-skill",
  slug: "brawler",
  title: "Brawler",
  key: "brawler",
  baseName: "Cleave",
  description:
    '"Focus your strength into a mighty swing, dealing 1742 Physical Damage to enemies in front of you.\\n\\nYou also gain a damage shield that absorbs 1799 damage for 6 seconds. Each enemy hit increases the damage shield\'s strength by 50%, up to 300%."',
  icon: "/esoui/art/icons/ability_2handed_002_b.dds",
  esoSkillId: 39769,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
