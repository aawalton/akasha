import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const intensiveMender = {
  id: "019e6245-a6b4-7496-b358-ad5616f4579f",
  pageTypeSlug: "temper-skill",
  slug: "intensive-mender",
  title: "Intensive Mender",
  key: "intensive-mender",
  baseName: "Spirit Mender",
  description:
    '"Conjure a ghostly spirit to do your bidding and stay by your side for 8 seconds. The spirit heals you or lowest Health ally around you every 2 seconds, restoring 1438 Health to the target and 2 allies nearby them.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_015_b.dds",
  esoSkillId: 40118840,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
