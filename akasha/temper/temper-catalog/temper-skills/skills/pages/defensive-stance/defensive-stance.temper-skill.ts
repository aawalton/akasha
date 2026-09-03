import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const defensiveStance = {
  id: "019e6226-00e2-762b-9660-dd17e10ec6b7",
  pageTypeSlug: "temper-skill",
  slug: "defensive-stance",
  title: "Defensive Stance",
  key: "defensive-stance",
  baseName: "Defensive Posture",
  description:
    '"Bolster your defenses, gaining a damage shield that absorbs up to 4958 damage for 6 seconds. This portion of the ability scales off your Max Health.\\n\\nYou reflect the next harmful direct damage projectile cast at you, once per cast.\\n\\nWhile slotted and you have a shield equipped, the amount of damage you can block is increased by 10% and the cost of blocking is reduced by 10%."',
  icon: "/esoui/art/icons/ability_1handed_004_a.dds",
  esoSkillId: 41358,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
  effects: "jsonl",
} as const satisfies TemperSkill
