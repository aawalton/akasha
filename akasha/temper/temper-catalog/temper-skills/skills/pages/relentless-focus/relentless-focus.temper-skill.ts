import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const relentlessFocus = {
  id: "019e6245-a707-76a4-8088-06cd5417c764",
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
  effects: "jsonl",
} as const satisfies TemperSkill
