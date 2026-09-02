import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const relentlessFocus = {
  id: "01a05fd1-7c83-7fb3-867f-80490ccddec5",
  pageTypeSlug: "temper-skill",
  slug: "relentless-focus",
  title: "Relentless Focus",
  key: "relentless-focus",
  baseName: "Grim Focus",
  description:
    '"When slotted on either bar, you gain Major Prophecy and Major Savagery, increasing your Spell and Weapon Critical rating by 2629.\\n\\nYour Light and Heavy Attacks now generate a stack of Relentless Focus, up to 10 times. Fully-charged Heavy Attacks grant two stacks.\\n\\nWhen at 4 or more stacks, you can consume 4 to fire a spectral arrow to deal 4183 Disease Damage and heal for 33% of the damage dealt, if you are in melee range."',
  icon: "/esoui/art/icons/ability_nightblade_005_a.dds",
  esoSkillId: 62107,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
