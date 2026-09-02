import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const bloodSacrifice = {
  id: "01a05fd0-4371-7b0c-a97b-fff15ed05a60",
  pageTypeSlug: "temper-skill",
  slug: "blood-sacrifice",
  title: "Blood Sacrifice",
  key: "blood-sacrifice",
  baseName: "Render Flesh",
  description:
    '"Sacrifice your own power to repair damaged flesh, healing you or an ally in front of you for 3600 Health but applying Minor Defile to yourself for 4 seconds, reducing your healing received and damage shield strength by 6%.\\n\\nConsumes a corpse near you when cast to heal a second target."',
  icon: "/esoui/art/icons/ability_necromancer_013_b.dds",
  esoSkillId: 40117888,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 1,
  morphIndex: 2,
  rank: 12,
  skillLineId: "necromancer-living-death",
  skillType: "active",
  subcategoryId: "necromancer-living-death",
} as const satisfies TemperSkill
