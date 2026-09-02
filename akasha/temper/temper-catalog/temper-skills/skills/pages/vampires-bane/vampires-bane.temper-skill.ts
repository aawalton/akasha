import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const vampiresBane = {
  id: "01a05fd1-d282-7594-931c-f09048475c5b",
  pageTypeSlug: "temper-skill",
  slug: "vampires-bane",
  title: "Vampire's Bane",
  key: "vampires-bane",
  baseName: "Sun Fire",
  description:
    '"Blast an enemy with a charge of radiant heat, dealing 1161 Flame Damage, and an additional 5370 Flame Damage over 30 seconds.\\n\\nUpon activation you gain Major Savagery and Major Prophecy for 30 seconds, increasing your Weapon and Spell Critical rating by 2629."',
  icon: "/esoui/art/icons/ability_templar_vampire_bane.dds",
  esoSkillId: 24180,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 1,
  rank: 8,
  skillLineId: "templar-dawns-wrath",
  skillType: "active",
  subcategoryId: "templar-dawns-wrath",
} as const satisfies TemperSkill
