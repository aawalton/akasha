import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinHazeOfCinders = {
  id: "01a05fd0-1d85-783d-acc0-37e555d1bb12",
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
