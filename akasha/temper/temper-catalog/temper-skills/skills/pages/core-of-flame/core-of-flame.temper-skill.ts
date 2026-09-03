import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const coreOfFlame = {
  id: "019e6f53-a022-7eb0-81e3-8ef22c2ae44d",
  pageTypeSlug: "temper-skill",
  slug: "core-of-flame",
  title: "Core of Flame",
  key: "core-of-flame",
  baseName: "Core of Flame",
  description:
    '"Let the fire within draw heat to your core, restoring |cffffff15|r% of your missing Magicka and Stamina every |cffffff2|r seconds over |cffffff4|r seconds.\\n\\nWhen this ability completes, you release this heat as a blast of fire that deals |cffffff7360|r Flame Damage to nearby enemies."',
  icon: "/esoui/art/icons/ability_dragonknight_012.dds",
  esoSkillId: 31837,
  isMorph: false,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 0,
  rank: 20,
  skillLineId: "dragonknight-ardent-flame",
  skillType: "active",
  subcategoryId: "dragonknight-ardent-flame",
} as const satisfies TemperSkill
