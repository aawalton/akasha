import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spiritGuardian = {
  id: "019e6245-a73f-73d1-8025-74c46fcb20f5",
  pageTypeSlug: "temper-skill",
  slug: "spirit-guardian",
  title: "Spirit Guardian",
  key: "spirit-guardian",
  baseName: "Spirit Mender",
  description:
    '"Conjure a ghostly spirit to do your bidding and stay by your side for 16 seconds. The spirit heals you or the lowest Health ally around you every 2 seconds, restoring 718 Health.\\n\\nWhile active, 10% of the damage you take is transferred to the spirit instead.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_015_a.dds",
  esoSkillId: 40118912,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 8,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
