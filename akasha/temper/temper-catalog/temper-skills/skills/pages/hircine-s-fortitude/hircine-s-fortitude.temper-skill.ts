import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const hircineSFortitude = {
  id: "01a05fd0-dcb5-7756-ba51-d4bd9133169d",
  pageTypeSlug: "temper-skill",
  slug: "hircine-s-fortitude",
  title: "Hircine's Fortitude",
  key: "hircine-s-fortitude",
  baseName: "Hircine's Bounty",
  description:
    '"Invoke the Huntsman\'s blessing, healing you for |cffffff7338|r Health, scaling off your Max Health. You also restore |cffffff12|r% Stamina, increasing by up to |cffffff100|r% based on how high your current Health is. \\nCurrent Restore: |cffffff5858|r\\n\\nWhile slotted you gain Major Brutality, Sorcery, and Vitality increasing Weapon and Spell Damage by |cffffff20|r% and healing received and damage shield strength by |cffffff12|r%."',
  icon: "/esoui/art/icons/ability_werewolf_004_c.dds",
  esoSkillId: 58325,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 2,
  rank: 4,
  skillLineId: "world-werewolf",
  skillType: "active",
  subcategoryId: "world-werewolf",
} as const satisfies TemperSkill
