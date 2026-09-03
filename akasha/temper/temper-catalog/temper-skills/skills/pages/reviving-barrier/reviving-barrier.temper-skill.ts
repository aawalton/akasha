import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const revivingBarrier = {
  id: "019e6251-4ce1-7ac2-8a38-27f0881707be",
  pageTypeSlug: "temper-skill",
  slug: "reviving-barrier",
  title: "Reviving Barrier",
  key: "reviving-barrier",
  baseName: "Barrier",
  description:
    '"Invoke defensive tactics to protect yourself and nearby group members with wards that each absorb up to 11620 damage for 30 seconds.\\n\\nThe wards also heal you and your group members for 5370 Health over 15 seconds."',
  icon: "/esoui/art/icons/ability_ava_006_b.dds",
  esoSkillId: 46614,
  isMorph: true,
  learnedLevel: 6,
  lineRankNeeded: 6,
  morphIndex: 1,
  rank: 8,
  skillLineId: "alliance-war-support",
  skillType: "ultimate",
  subcategoryId: "alliance-war-support",
} as const satisfies TemperSkill
