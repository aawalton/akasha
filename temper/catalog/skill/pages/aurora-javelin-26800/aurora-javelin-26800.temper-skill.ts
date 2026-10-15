import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const auroraJavelin26800 = {
  id: "019e6f53-9ed6-79d2-b463-2c54de4d876a",
  type: "page-type/temper-skill",
  slug: "aurora-javelin-26800",
  title: "Aurora Javelin",
  key: "aurora-javelin-26800",
  baseName: "Piercing Javelin",
  description:
    "Hurl your spear at an enemy with godlike strength, dealing |cffffff5004|r Magic Damage and knocking them back |cffffff8|r meters.\n\nThis ability ignores the enemy's Resistances and cannot be blocked.\n\nThe spear deals an additional |cffffff2|r% damage for every |cffffff1|r meter you are away from the target, up to a maximum of |cffffff40|r%.",
  icon: "/esoui/art/icons/ability_templar_ripping_spear.dds",
  esoSkillId: 26800,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "temper-skill-line/templar-aedric-spear",
  skillType: "temper-skill-type/active",
  hashPlace: 63,
  createdAt: "2026-05-28T16:03:31.670Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.06198 MaxStat + 0.65079 MaxPower (Ultimate, ratio = 10.50, RankMod(1), Dmg, Magic, SingleTarget, Direct, R2 = 1)",
    "<<2>> = 8 meters (Constant)",
  ],
} as const satisfies TemperSkill
