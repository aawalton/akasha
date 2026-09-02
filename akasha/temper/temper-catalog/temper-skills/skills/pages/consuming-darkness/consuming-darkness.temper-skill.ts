import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const consumingDarkness = {
  id: "01a05fd0-43a1-770a-bb92-1aba25deba99",
  pageTypeSlug: "temper-skill",
  slug: "consuming-darkness",
  title: "Consuming Darkness",
  key: "consuming-darkness",
  baseName: "Consuming Darkness",
  description:
    '"Conjure a ring of shadow, reducing the Movement Speed of enemies by |cffffff70|r% and granting you and your allies Major Protection, reducing your damage taken by |cffffff10|r%.\\n\\nAllies in the area can activate the Hidden Refresh synergy, granting them invisibility, increasing their Movement Speed by |cffffff70|r%, and healing them for |cffffff28640|r Health over |cffffff4|r seconds."',
  icon: "/esoui/art/icons/ability_nightblade_015.dds",
  esoSkillId: 25411,
  isMorph: false,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 0,
  rank: 12,
  skillLineId: "nightblade-shadow",
  skillType: "ultimate",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
