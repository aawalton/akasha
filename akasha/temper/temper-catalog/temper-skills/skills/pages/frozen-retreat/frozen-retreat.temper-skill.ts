import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const frozenRetreat = {
  id: "019e6245-a68c-7bd9-adbc-83621d043590",
  pageTypeSlug: "temper-skill",
  slug: "frozen-retreat",
  title: "Frozen Retreat",
  key: "frozen-retreat",
  baseName: "Frozen Gate",
  description:
    '"Summon an ancient portal, which arms after 1.5 seconds.\\n\\nWhen triggered the enemy is teleported to you if within range, immobilized for 3 seconds, and dealt 1799 Frost Damage.\\n\\nAn ally in the portal can activate the Icy Escape synergy, teleporting them to you and granting them Major Expedition, increasing their Movement Speed by 30% for 8 seconds.\\n\\nYou can have up to 3 Frozen Retreats active at a time."',
  icon: "/esoui/art/icons/ability_warden_005_b.dds",
  esoSkillId: 86186,
  isMorph: true,
  learnedLevel: 42,
  lineRankNeeded: 42,
  morphIndex: 2,
  rank: 12,
  skillLineId: "warden-winters-embrace",
  skillType: "active",
  subcategoryId: "warden-winters-embrace",
} as const satisfies TemperSkill
