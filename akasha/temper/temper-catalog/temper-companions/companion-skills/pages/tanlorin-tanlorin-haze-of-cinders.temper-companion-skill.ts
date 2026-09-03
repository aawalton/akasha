import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinHazeOfCinders = {
  id: "019e6484-38a4-75a3-96be-0f4376392195",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-haze-of-cinders",
  key: "tanlorin-haze-of-cinders",
  title: "Haze of Cinders",
  icon: "/esoui/art/icons/ability_companion_dragonknight_hazeofcinders.dds",
  description:
    "Your Companion summons a scorching cloud of ash at the target location for $$1 seconds, reducing enemy Movement Speed by 70% and healing them and their allies for $1 Health every 2 seconds.",
  companionId: "tanlorin",
  abilityId: 214708,
  skillLineId: "companion-tanlorin-radiating-heart",
  skillType: "active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
