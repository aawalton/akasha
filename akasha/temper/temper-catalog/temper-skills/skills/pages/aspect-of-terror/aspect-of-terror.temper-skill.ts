import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const aspectOfTerror = {
  id: "01a05fd0-4352-7f0a-8c98-923a85ff1d6b",
  pageTypeSlug: "temper-skill",
  slug: "aspect-of-terror",
  title: "Aspect of Terror",
  key: "aspect-of-terror",
  baseName: "Aspect of Terror",
  description:
    '"Summon a dark spirit to terrify nearby enemies, causing them to cower in fear for |cffffff2|r seconds and be afflicted with Major Cowardice for |cffffff10|r seconds, reducing their Weapon and Spell Damage by |cffffff430|r."',
  icon: "/esoui/art/icons/ability_nightblade_016.dds",
  esoSkillId: 25352,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "nightblade-shadow",
  skillType: "active",
  subcategoryId: "nightblade-shadow",
} as const satisfies TemperSkill
