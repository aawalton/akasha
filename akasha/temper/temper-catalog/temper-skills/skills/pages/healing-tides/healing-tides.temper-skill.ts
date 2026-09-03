import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingTides = {
  id: "019e6245-a69f-7e38-bc0b-d9f9cffda9db",
  pageTypeSlug: "temper-skill",
  slug: "healing-tides",
  title: "Healing Tides",
  key: "healing-tides",
  baseName: "Healing Tides",
  description:
    '"Your mastery of weaving fate and abyssal water increases your healing done by 4% for each active Crux."',
  icon: "/esoui/art/icons/passive_arcanist_09.dds",
  esoSkillId: 185186,
  isMorph: false,
  learnedLevel: 18,
  lineRankNeeded: 18,
  morphIndex: 0,
  rank: 2,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "passive",
  subcategoryId: "arcanist-curative-runeforms",
  status: "unsupported",
} as const satisfies TemperSkill
