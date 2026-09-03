import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const boundArmaments = {
  id: "019e6245-a603-7b3c-aa37-bf5fd7dfee99",
  pageTypeSlug: "temper-skill",
  slug: "bound-armaments",
  title: "Bound Armaments",
  key: "bound-armaments",
  baseName: "Bound Armor",
  description:
    '"When slotted on either bar, you gain Major Prophecy and Major Savagery, increasing your Critical Rating by 2629.\\n\\nYour Light and Heavy Attacks now generate a stack of Bound Armaments for 10 seconds, up to 8 times. Fully-charged Heavy Attacks grant two stacks.\\n\\nWhen at one or more stacks, you can arm up to 4 of them to strike your target for 863 Physical Damage every 0.3 seconds for each stack of Bound Armaments consumed."',
  icon: "/esoui/art/icons/ability_sorcerer_bound_armaments.dds",
  esoSkillId: 30432,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 1,
  rank: 8,
  skillLineId: "sorcerer-daedric-summoning",
  skillType: "active",
  subcategoryId: "sorcerer-daedric-summoning",
  effects: "jsonl",
} as const satisfies TemperSkill
