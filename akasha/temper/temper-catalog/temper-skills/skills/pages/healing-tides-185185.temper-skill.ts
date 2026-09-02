import type { TemperSkill } from "../temper-skill.page-type.ts"

export const healingTides185185 = {
  id: "01a05fd0-dcac-73d4-8c9a-3a364a207728",
  pageTypeSlug: "temper-skill",
  slug: "healing-tides-185185",
  title: "Healing Tides",
  key: "healing-tides-185185",
  baseName: "Healing Tides",
  description:
    '"Your mastery of weaving fate and abyssal water increases your healing done by |cffffff2|r% for each active Crux."',
  icon: "/esoui/art/icons/passive_arcanist_09.dds",
  esoSkillId: 185185,
  isMorph: false,
  learnedLevel: 8,
  lineRankNeeded: 8,
  morphIndex: 0,
  rank: 8,
  skillLineId: "arcanist-curative-runeforms",
  skillType: "passive",
  subcategoryId: "arcanist-curative-runeforms",
} as const satisfies TemperSkill
