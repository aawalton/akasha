import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const runicJolt = {
  id: "019e6f53-a69a-7fd2-b012-24afd4b44610",
  pageTypeSlug: "temper-skill",
  slug: "runic-jolt",
  title: "Runic Jolt",
  key: "runic-jolt",
  baseName: "Runic Jolt",
  description:
    '"Craft a defensive Apocryphal rune that deals |cffffff4036|r Magic Damage and applies Minor Maim for |cffffff15|r seconds, reducing their damage done by |cffffff5|r%.\\n\\nThe rune also taunts for |cffffff15|r seconds if it would not cause taunt immunity, and generates Crux. While slotted, damage taken is reduced by |cffffff2|r% per active Crux."',
  icon: "/esoui/art/icons/ability_arcanist_007.dds",
  esoSkillId: 183165,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "active",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
