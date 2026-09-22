import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const ballista = {
  id: "019e6226-00d3-7c11-8ece-4dace3a9f553",
  type: "page-type/temper-skill",
  slug: "ballista",
  title: "Ballista",
  key: "ballista",
  baseName: "Rapid Fire",
  description:
    '"Create a turret to unleash a barrage of arrows at an enemy, dealing 15587 Physical Damage over 5 seconds."',
  icon: "/esoui/art/icons/ability_bow_006_a.dds",
  esoSkillId: 86620,
  isMorph: true,
  learnedLevel: 50,
  lineRankNeeded: 50,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-bow",
  skillType: "temper-skill-type/ultimate",
} as const satisfies TemperSkill
