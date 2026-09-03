import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const healingWard = {
  id: "019e6226-00f9-73cf-9ad0-e90f3fd3d1a1",
  pageTypeSlug: "temper-skill",
  slug: "healing-ward",
  title: "Healing Ward",
  key: "healing-ward",
  baseName: "Steadfast Ward",
  description:
    "\"Call on your staff's strength to protect you or the lowest health ally around you with a damage shield that absorbs 2399 damage.\\n\\nThe shield's strength is increased by up to 100%, depending on the severity of the target's wounds. \\n\\nWhile the shield persists, the target is healed for 33% of the shield's remaining strength every second.\"",
  icon: "/esoui/art/icons/ability_restorationstaff_001_a.dds",
  esoSkillId: 41320,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 2,
  rank: 12,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
