import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const icyAura = {
  id: "019e6245-a6ab-73b6-bea2-de4f94119656",
  pageTypeSlug: "temper-skill",
  slug: "icy-aura",
  title: "Icy Aura",
  key: "icy-aura",
  baseName: "Icy Aura",
  description:
    '"When you take direct damage from an enemy in melee range, you apply a stack of Bite of Winter to them for 3 seconds, up to 5 stacks max. Attackers at max stacks are afflicted with Major Maim for 3 seconds, reducing their damage done by 10%."',
  icon: "/esoui/art/icons/passive_warden_003.dds",
  esoSkillId: 86194,
  isMorph: false,
  learnedLevel: 36,
  lineRankNeeded: 36,
  morphIndex: 0,
  rank: 2,
  skillLineId: "warden-winters-embrace",
  skillType: "passive",
  subcategoryId: "warden-winters-embrace",
  status: "unsupported",
  effects: "jsonl",
} as const satisfies TemperSkill
