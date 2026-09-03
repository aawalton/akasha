import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shieldedAssault38401 = {
  id: "019e6f53-a6fe-76f8-8f5b-463a73c9fdcb",
  pageTypeSlug: "temper-skill",
  slug: "shielded-assault-38401",
  title: "Shielded Assault",
  key: "shielded-assault-38401",
  baseName: "Shield Charge",
  description:
    '"Rush an enemy and ram them, dealing |cffffff4845|r Physical Damage and stunning them for |cffffff3|r seconds.\\n\\nYou gain a damage shield after the attack, absorbing |cffffff7258|r damage for |cffffff6|r seconds. This portion of the ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_1handed_003_a.dds",
  esoSkillId: 38401,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
