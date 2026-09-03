import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const elude39192 = {
  id: "019e6f53-a131-7f9c-8bce-56a21f9e74a5",
  pageTypeSlug: "temper-skill",
  slug: "elude-39192",
  title: "Elude",
  key: "elude-39192",
  baseName: "Evasion",
  description:
    '"Shroud yourself in mist to gain Major Evasion, reducing damage taken from area attacks by |cffffff20|r% for |cffffff38|r seconds.\\n\\nWhile this effect is active, when you take damage from a direct area of effect attack you gain Major Expedition for |cffffff6|r seconds, increasing your Movement Speed by |cffffff30|r%. \\n\\nEach piece of Medium Armor worn increases the duration of this ability."',
  icon: "/esoui/art/icons/ability_armor_002_b.dds",
  esoSkillId: 39192,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 2,
  rank: 22,
  skillLineId: "armor-medium-armor",
  skillType: "active",
  subcategoryId: "armor-medium-armor",
} as const satisfies TemperSkill
