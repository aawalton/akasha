import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const bastianBastianTough = {
  id: "019e6484-3854-7de8-b88a-9a80cc6ffa59",
  type: "page-type/temper-companion-skill",
  slug: "bastian-bastian-tough",
  key: "bastian-tough",
  title: "Tough",
  icon: "/esoui/art/icons/passive_companion_dragonknight_017.dds",
  description: "Increases Max Health by 3% and increases damage done by 3%.",
  companionId: "bastian",
  abilityId: 157245,
  skillLineId: "companion-bastian",
  skillType: "temper-skill-type/passive",
  validRoles: ["dps", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
