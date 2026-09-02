import type { TemperSkill } from "../temper-skill.page-type.ts"

export const spiritMender = {
  id: "01a05fd1-d23f-7eb4-8b9c-822eff36fc3a",
  pageTypeSlug: "temper-skill",
  slug: "spirit-mender",
  title: "Spirit Mender",
  key: "spirit-mender",
  baseName: "Spirit Mender",
  description:
    '"Conjure a ghostly spirit to do your bidding and stay by your side for |cffffff16|r seconds. The spirit heals you or the lowest Health ally around you every |cffffff2|r seconds, restoring |cffffff2191|r Health.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_015.dds",
  esoSkillId: 115710,
  isMorph: false,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 0,
  rank: 30,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
