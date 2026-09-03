import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const cephaliarchSFlail = {
  id: "019e6f53-9fc4-7e6c-a107-763cf4dfad95",
  pageTypeSlug: "temper-skill",
  slug: "cephaliarch-s-flail",
  title: "Cephaliarch's Flail",
  key: "cephaliarch-s-flail",
  baseName: "Abyssal Impact",
  description:
    '"Infuse your arm with abyssal magic to form tentacles that lash out at your foes dealing |cffffff7125|r Physical Damage and generating Crux. Enemies are immobilized for |cffffff3|r seconds and marked with Abyssal Ink for |cffffff20|r seconds.\\n\\nIf an enemy is hit, you for heal for |cffffff3150|r Health, once per cast.\\n\\nYou deal |cffffff5|r% increased damage to enemies drenched in Abyssal Ink."',
  icon: "/esoui/art/icons/ability_arcanist_003_a.dds",
  esoSkillId: 183006,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "active",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
