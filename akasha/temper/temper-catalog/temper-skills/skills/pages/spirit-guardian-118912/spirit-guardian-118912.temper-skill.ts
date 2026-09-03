import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const spiritGuardian118912 = {
  id: "019e6f53-a7a0-7f20-bace-0bc7d04ade0c",
  pageTypeSlug: "temper-skill",
  slug: "spirit-guardian-118912",
  title: "Spirit Guardian",
  key: "spirit-guardian-118912",
  baseName: "Spirit Mender",
  description:
    '"Conjure a ghostly spirit to do your bidding and stay by your side for |cffffff16|r seconds. The spirit heals you or the lowest Health ally around you every |cffffff2|r seconds, restoring |cffffff2262|r Health.\\n\\nWhile active, |cffffff10|r% of the damage you take is transferred to the spirit instead.\\n\\nCreates a corpse on death if you are in combat."',
  icon: "/esoui/art/icons/ability_necromancer_015_a.dds",
  esoSkillId: 118912,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 1,
  rank: 30,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
