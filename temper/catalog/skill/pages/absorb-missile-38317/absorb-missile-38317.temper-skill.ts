import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export const absorbMissile38317 = {
  id: "019e6f53-9e83-73d9-b181-04bb011f6f3c",
  type: "page-type/temper-skill",
  slug: "absorb-missile-38317",
  title: "Absorb Missile",
  key: "absorb-missile-38317",
  baseName: "Defensive Posture",
  description:
    "Bolster your defenses, gaining a damage shield that absorbs up to |cffffff7027|r damage for |cffffff6|r seconds.  \n\nWhile the shield persists, you are healed for |cffffff3218|r Health the next time a harmful direct damage projectile hits you. This effect can occur once per cast.\n\nThis ability scales off your Max Health.",
  icon: "/esoui/art/icons/ability_1handed_004_b.dds",
  esoSkillId: 38317,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 14,
  skillLineId: "temper-skill-line/weapon-one-hand-and-shield",
  skillType: "temper-skill-type/active",
  hashPlace: 5,
  createdAt: "2026-05-28T16:03:31.587Z",
  updatedAt: "2026-10-21T06:23:05.681Z",
  equations: [
    "<<1>> = 0.3099 Health (Health, DmgShield, SingleTarget, Direct, 6s duration, R2 = 1)",
    "<<2>> = 6 seconds (Constant)",
    "<<3>> = 0.16000979 Health (Health, RankMod(1), Heal, SingleTarget, Direct)",
  ],
} as const satisfies TemperSkill
