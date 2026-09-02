import type { TemperSkill } from "../temper-skill.page-type.ts"

export const lotusFan25493 = {
  id: "01a05fd1-2ded-74d4-bf27-d76658f24994",
  pageTypeSlug: "temper-skill",
  slug: "lotus-fan-25493",
  title: "Lotus Fan",
  key: "lotus-fan-25493",
  baseName: "Teleport Strike",
  description:
    '"Flash through the shadows and ambush an enemy while unleashing a fan of knives, dealing |cffffff5888|r Magic Damage to them and enemies around you.\\n\\nAll enemies hit take an additional |cffffff6725|r Magic Damage over |cffffff5|r seconds and are afflicted with Minor Vulnerability for |cffffff10|r seconds, increasing their damage taken by |cffffff5|r%."',
  icon: "/esoui/art/icons/ability_nightblade_008_a.dds",
  esoSkillId: 25493,
  isMorph: true,
  learnedLevel: 4,
  lineRankNeeded: 4,
  morphIndex: 1,
  rank: 4,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
