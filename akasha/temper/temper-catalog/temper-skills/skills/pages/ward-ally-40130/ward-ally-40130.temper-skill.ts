import type { TemperSkill } from "../../temper-skill.page-type.ts"

export const wardAlly40130 = {
  id: "019e6f53-a9d7-7c04-9c45-2e301653c062",
  pageTypeSlug: "temper-skill",
  slug: "ward-ally-40130",
  title: "Ward Ally",
  key: "ward-ally-40130",
  baseName: "Steadfast Ward",
  description:
    "\"Call on your staff's strength to protect you and the lowest health ally around you with a damage shield that absorbs |cffffff8237|r damage.\\n\\nThe shield's strength is increased by up to |cffffff100|r%, depending on the severity of the target's wounds.\"",
  icon: "/esoui/art/icons/ability_restorationstaff_001_b.dds",
  esoSkillId: 40130,
  isMorph: true,
  learnedLevel: 1,
  lineRankNeeded: 20,
  morphIndex: 1,
  rank: 20,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  subcategoryId: "weapon-restoration-staff",
} as const satisfies TemperSkill
