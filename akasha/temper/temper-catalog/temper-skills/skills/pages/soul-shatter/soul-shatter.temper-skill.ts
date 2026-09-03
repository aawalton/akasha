import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const soulShatter = {
  id: "019e6251-4cee-7060-bb09-8f4b77fe7965",
  pageTypeSlug: "temper-skill",
  slug: "soul-shatter",
  title: "Soul Shatter",
  key: "soul-shatter",
  baseName: "Soul Shatter",
  description:
    '"When your Health drops below 20% your soul explodes, dealing 1600 Magic Damage to enemies within 8 meters of you.\\n\\nThis effect can occur once every 2 minutes and scales off your Max Health."',
  icon: "/esoui/art/icons/ability_sorcerer_065.dds",
  esoSkillId: 45583,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 0,
  rank: 2,
  skillLineId: "world-soul-magic",
  skillType: "passive",
  subcategoryId: "world-soul-magic",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
