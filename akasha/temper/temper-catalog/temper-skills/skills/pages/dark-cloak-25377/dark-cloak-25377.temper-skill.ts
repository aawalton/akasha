import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const darkCloak25377 = {
  id: "019e6f53-a070-7476-aae6-b8afa50a21f6",
  pageTypeSlug: "temper-skill",
  slug: "dark-cloak-25377",
  title: "Dark Cloak",
  key: "dark-cloak-25377",
  baseName: "Shadow Cloak",
  description:
    '"Shroud yourself in protective shadow to heal for |cffffff1072|r Health every |cffffff1|r second, over |cffffff3|r seconds, increasing by an additional |cffffff150|r% while Bracing. This portion of the ability scales off your Max Health.\\n\\nWhile slotted on either bar, you gain Minor Protection, reducing your damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_nightblade_004_b.dds",
  esoSkillId: 25377,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
