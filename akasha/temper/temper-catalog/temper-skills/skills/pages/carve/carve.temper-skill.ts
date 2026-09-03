import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const carve = {
  id: "019e6226-00db-70e2-9f24-7231705479ee",
  pageTypeSlug: "temper-skill",
  slug: "carve",
  title: "Carve",
  key: "carve",
  baseName: "Cleave",
  description:
    '"Focus your strength into a mighty swing, dealing 1742 Bleed Damage to enemies in front of you, and causing them to bleed for an additional 2868 Bleed Damage over 12 seconds.  \\n\\nHitting a target that is already bleeding from this ability extends the duration by 10 seconds, up to a maximum of 32.\\n\\nYou also gain a damage shield that absorbs 1742 damage for 6 seconds."',
  icon: "/esoui/art/icons/ability_2handed_002_a.dds",
  esoSkillId: 39754,
  isMorph: true,
  learnedLevel: 14,
  lineRankNeeded: 14,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-two-handed",
  skillType: "active",
  subcategoryId: "weapon-two-handed",
} as const satisfies TemperSkill
