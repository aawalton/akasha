import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const annulment = {
  id: "019e6f53-9eb3-739e-843c-030a9097433a",
  type: "page-type/temper-skill",
  slug: "annulment",
  title: "Annulment",
  key: "annulment",
  baseName: "Annulment",
  description:
    '"Convert a portion of your Magicka into a protective ward, gaining a damage shield that absorbs |cffffff5046|r damage for |cffffff6|r seconds. Damage shield strength capped at |cffffff50|r% of your Max Health."',
  icon: "/esoui/art/icons/ability_armor_003.dds",
  esoSkillId: 29338,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 22,
  morphIndex: 0,
  rank: 22,
  skillLineId: "temper-skill-line/armor-light-armor",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
