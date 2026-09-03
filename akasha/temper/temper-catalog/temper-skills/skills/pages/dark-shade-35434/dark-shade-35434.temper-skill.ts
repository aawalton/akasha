import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkShade35434 = {
  id: "019e6f53-a07c-789e-97c2-3daae20106c6",
  pageTypeSlug: "temper-skill",
  slug: "dark-shade-35434",
  title: "Dark Shade",
  key: "dark-shade-35434",
  baseName: "Summon Shade",
  description:
    '"Summon a shade version of yourself to attack an enemy and fight at your side for |cffffff20|r seconds. \\n\\nThe shade attacks nearby enemies within |cffffff9|r meters of it, dealing |cffffff2292|r Magic Damage once every |cffffff2|r seconds and afflicting them with Minor Maim for |cffffff4|r seconds, reducing their damage done by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_nightblade_001_a.dds",
  esoSkillId: 35434,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 42,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
