import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const theTideKingSGaze = {
  id: "019e6f53-a834-7842-898d-5b399a4e987e",
  pageTypeSlug: "temper-skill",
  slug: "the-tide-king-s-gaze",
  title: "The Tide King's Gaze",
  key: "the-tide-king-s-gaze",
  baseName: "The Unblinking Eye",
  description:
    '"Tear open the fabric of the Aurbis to summon a scion of Hermaeus Mora. This being casts forth a beam that rends asunder reality for |cffffff8|r seconds that deals |cffffff3777|r Magic Damage to enemies within 5 meters every |cffffff0.5|r seconds. \\n\\nThe scion\'s beam automatically follows the initial target, and hunts for a new one within 8 meters if it is slain."',
  icon: "/esoui/art/icons/ability_arcanist_006_a.dds",
  esoSkillId: 189837,
  isMorph: true,
  learnedLevel: 12,
  lineRankNeeded: 12,
  morphIndex: 1,
  rank: 12,
  skillLineId: "arcanist-herald-of-the-tome",
  skillType: "ultimate",
  subcategoryId: "arcanist-herald-of-the-tome",
} as const satisfies TemperSkill
