import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const absorbMissile = {
  id: "019e6226-00cb-76ab-9ada-41c2cc280f2d",
  type: "page-type/temper-skill",
  slug: "absorb-missile",
  title: "Absorb Missile",
  key: "absorb-missile",
  baseName: "Defensive Posture",
  description:
    "Bolster your defenses, gaining a damage shield that absorbs up to 4958 damage for 6 seconds.  \n\nWhile the shield persists, you are healed for 2560 Health the next time a harmful direct damage projectile hits you. This effect can occur once per cast.\n\nThis ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_1handed_004_b.dds",
  esoSkillId: 41380,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 12,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 4,
  createdAt: "2026-05-26T02:38:38.283Z",
  updatedAt: "2026-10-15T15:44:52.958Z",
  equations: [
    "<<1>> = 0.3099 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 0.16006335 Health (Health, RankMod(1.033), Heal, SingleTarget, Direct, R2 = 1)",
  ],
} as const satisfies TemperSkill
