import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const absorbMissile38317 = {
  id: "019e6f53-9e83-73d9-b181-04bb011f6f3c",
  pageTypeSlug: "temper-skill",
  slug: "absorb-missile-38317",
  title: "Absorb Missile",
  key: "absorb-missile-38317",
  baseName: "Defensive Posture",
  description:
    '"Bolster your defenses, gaining a damage shield that absorbs up to |cffffff7027|r damage for |cffffff6|r seconds.  \\n\\nWhile the shield persists, you are healed for |cffffff3218|r Health the next time a harmful direct damage projectile hits you. This effect can occur once per cast.\\n\\nThis ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_1handed_004_b.dds",
  esoSkillId: 38317,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 14,
  morphIndex: 2,
  rank: 14,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
