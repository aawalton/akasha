import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const borrowedTime104059 = {
  id: "019e6f53-9f78-7ffb-8c60-437780b11c66",
  type: "page-type/temper-skill",
  slug: "borrowed-time-104059",
  title: "Borrowed Time",
  key: "borrowed-time-104059",
  baseName: "Time Stop",
  description:
    '"Freeze the passage of time at the target location, gradually reducing the Movement Speed of enemies in the area during the channel before finally stunning them in place for |cffffff3|r seconds when the channel completes.\\n\\nEnemies that are stunned gain |cffffff5000|r Heal Absorption for |cffffff3|r seconds, negating the next |cffffff5000|r points of healing done."',
  icon: "/esoui/art/icons/ability_psijic_002_a.dds",
  esoSkillId: 104059,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 2,
  morphIndex: 1,
  rank: 2,
  skillLineId: "temper-skill-line/guild-psijic-order",
  skillType: "temper-skill-type/active",
} as const satisfies TemperSkill
