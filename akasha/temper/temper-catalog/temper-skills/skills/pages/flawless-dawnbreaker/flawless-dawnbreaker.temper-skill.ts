import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const flawlessDawnbreaker = {
  id: "019e6238-c2be-7645-9879-1e8410f84b17",
  pageTypeSlug: "temper-skill",
  slug: "flawless-dawnbreaker",
  title: "Flawless Dawnbreaker",
  key: "flawless-dawnbreaker",
  baseName: "Dawnbreaker",
  description:
    '"Arm yourself with Meridia\'s sacred sword and dispense her retribution, dealing 2904 Physical Damage to enemies in front of you and an additional 3483 Physical Damage over 6 seconds.\\n\\nAfter activating, your Weapon and Spell Damage is increased by 300 for 20 seconds."',
  icon: "/esoui/art/icons/ability_fightersguild_005_a.dds",
  esoSkillId: 42586,
  isMorph: true,
  learnedLevel: 10,
  lineRankNeeded: 10,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-fighters-guild",
  skillType: "ultimate",
  subcategoryId: "guild-fighters-guild",
} as const satisfies TemperSkill
