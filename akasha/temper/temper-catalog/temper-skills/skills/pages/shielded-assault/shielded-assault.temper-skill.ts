import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const shieldedAssault = {
  id: "019e6226-0112-7f37-a7e3-844ecfb5fbf0",
  pageTypeSlug: "temper-skill",
  slug: "shielded-assault",
  title: "Shielded Assault",
  key: "shielded-assault",
  baseName: "Shield Charge",
  description:
    '"Rush an enemy and ram them, dealing 1393 Physical Damage and stunning them for 3 seconds.\\n\\nYou gain a damage shield after the attack, absorbing 5121 damage for 6 seconds. This portion of the ability scales off your Max Health."',
  icon: "/esoui/art/icons/ability_1handed_003_a.dds",
  esoSkillId: 41526,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-one-hand-and-shield",
  skillType: "active",
  subcategoryId: "weapon-one-hand-and-shield",
} as const satisfies TemperSkill
