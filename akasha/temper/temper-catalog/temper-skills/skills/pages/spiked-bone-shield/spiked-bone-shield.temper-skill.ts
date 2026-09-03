import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spikedBoneShield = {
  id: "019e6238-c319-7733-bedd-af584a8e559a",
  pageTypeSlug: "temper-skill",
  slug: "spiked-bone-shield",
  title: "Spiked Bone Shield",
  key: "spiked-bone-shield",
  baseName: "Bone Shield",
  description:
    '"Surround yourself with a whirlwind of bones, gaining a damage shield that absorbs up to 4958 damage for 6 seconds and returns 100% of direct damage absorbed back to the enemy. This ability scales off your Max Health.\\n\\nAn ally near you can activate the Bone Wall synergy, granting the ally and up to 5 other allies a damage shield equal to 30% of their Max Health for 6 seconds."',
  icon: "/esoui/art/icons/ability_undaunted_005b.dds",
  esoSkillId: 43323,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 8,
  skillLineId: "guild-undaunted",
  skillType: "active",
  subcategoryId: "guild-undaunted",
} as const satisfies TemperSkill
