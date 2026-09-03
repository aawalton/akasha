import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const protectTheBrood = {
  id: "019e6245-a6f2-71e3-b331-208180fa744a",
  pageTypeSlug: "temper-skill",
  slug: "protect-the-brood",
  title: "Protect the Brood",
  key: "protect-the-brood",
  baseName: "Wing Buffet",
  description:
    '"Unfurl draconic wings to safeguard you and nearby group members for 6 seconds, reducing damage taken from projectiles by 50% for you and 25% for group members.\\n\\nYou and your brood gain Minor Protection for 20 seconds, reducing damage taken by 5%. You gain Major Expedition for 4 seconds, increasing Movement Speed by 30%."',
  icon: "/esoui/art/icons/ability_dragonknight_008_a.dds",
  esoSkillId: 21017,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "dragonknight-draconic-power",
  skillType: "active",
  subcategoryId: "dragonknight-draconic-power",
} as const satisfies TemperSkill
