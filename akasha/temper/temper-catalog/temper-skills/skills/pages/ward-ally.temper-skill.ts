import type { TemperSkill } from "../temper-skill.page-type.ts"

export const wardAlly = {
  id: "01a05fd2-1e95-76f8-b556-3f167c60eec5",
  pageTypeSlug: "temper-skill",
  slug: "ward-ally",
  title: "Ward Ally",
  key: "ward-ally",
  baseName: "Steadfast Ward",
  description:
    "\"Call on your staff's strength to protect you and the lowest health ally around you with a damage shield that absorbs 2323 damage.\\n\\nThe shield's strength is increased by up to 100%, depending on the severity of the target's wounds.\"",
  icon: "/esoui/art/icons/ability_restorationstaff_001_b.dds",
  esoSkillId: 41302,
  isMorph: true,
  learnedLevel: 20,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 8,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
