import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const reapersMark = {
  id: "019e6245-a6fe-7f41-9072-b1288d7bf88a",
  pageTypeSlug: "temper-skill",
  slug: "reapers-mark",
  title: "Reaper's Mark",
  key: "reapers-mark",
  baseName: "Mark Target",
  description:
    "\"Expose an enemy's weaknesses to afflict them with Major Breach, reducing their Physical Resistance and Spell Resistance by 5948 for 20 seconds.\\n\\nWhen a marked enemy dies, you heal to full Health and gain Major Berserk, increasing your damage done by 10% for 10 seconds.\\n\\nYou can only have one Reaper's Mark active at a time.\"",
  icon: "/esoui/art/icons/ability_nightblade_014_a.dds",
  esoSkillId: 37658,
  isMorph: true,
  learnedLevel: 30,
  lineRankNeeded: 30,
  morphIndex: 2,
  rank: 12,
  skillLineId: "nightblade-assassination",
  skillType: "active",
  subcategoryId: "nightblade-assassination",
} as const satisfies TemperSkill
