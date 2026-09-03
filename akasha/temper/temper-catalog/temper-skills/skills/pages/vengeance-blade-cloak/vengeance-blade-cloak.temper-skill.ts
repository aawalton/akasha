import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vengeanceBladeCloak = {
  id: "019e6f53-a8c0-7abf-92c2-27ba72e9fee0",
  pageTypeSlug: "temper-skill",
  slug: "vengeance-blade-cloak",
  title: "Vengeance Blade Cloak",
  key: "vengeance-blade-cloak",
  baseName: "Vengeance Blade Cloak",
  description:
    '"Envelop yourself in a protective cloak of razors to gain Major Evasion, Minor Savagery, and Minor Prophecy for |cffffff20|r seconds, reducing damage taken from area attacks by |cffffff20|r% and increasing your Weapon and Spell Critical by |cffffff1314|r."',
  icon: "/esoui/art/icons/ability_dualwield_004.dds",
  esoSkillId: 241188,
  isMorph: false,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 0,
  rank: 1,
  skillLineId: "vengeance-weapon-dual-wield",
  skillType: "active",
  subcategoryId: "vengeance-weapon-dual-wield",
} as const satisfies TemperSkill
