import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const gibberingShelter = {
  id: "019e6245-a690-7bb4-a1b3-cc5b5af7a806",
  pageTypeSlug: "temper-skill",
  slug: "gibbering-shelter",
  title: "Gibbering Shelter",
  key: "gibbering-shelter",
  baseName: "Gibbering Shield",
  description:
    '"Gather the true strength of Apocrypha, forming a tentacle damage shield that absorbs 60% of all damage for 10 seconds, up to a max of 31733 damage.\\n\\nWhen the shield absorbs damage, pseudopods cascade out at up to 11 allies within 15 meters, granting them a damage shield for 4 seconds that absorbs up to 5462 damage. These shields can be applied once every 4 seconds. Both shields scale off your Max Health."',
  icon: "/esoui/art/icons/ability_arcanist_012_b.dds",
  esoSkillId: 40192380,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 2,
  rank: 12,
  skillLineId: "arcanist-soldier-of-apocrypha",
  skillType: "ultimate",
  subcategoryId: "arcanist-soldier-of-apocrypha",
} as const satisfies TemperSkill
