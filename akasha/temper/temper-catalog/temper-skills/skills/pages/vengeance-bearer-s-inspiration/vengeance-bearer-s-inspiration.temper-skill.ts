import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBearerSInspiration = {
  id: "019e6f53-a8bb-70a7-a3f2-18ad52599186",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-bearer-s-inspiration",
  title: "Vengeance-Bearer's Inspiration",
  key: "vengeance-bearer-s-inspiration",
  baseName: "Vengeance-Bearer's Inspiration",
  description:
    '"Etch a series of runes onto your weapon that pulse with power, generating a Crux if you have none while granting you Minor Force for |cffffff20|r seconds, increasing your Critical Damage done by |cffffff10|r%.\\n\\nWhile slotted on either ability bar, gain Major Prophecy and Savagery, increasing your Spell and Weapon Critical rating by |cffffff2629|r."',
  icon: "/esoui/art/icons/ability_arcanist_005.dds",
  esoSkillId: 238191,
  isMorph: false,
  learnedLevel: 0,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "vengeance-arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
