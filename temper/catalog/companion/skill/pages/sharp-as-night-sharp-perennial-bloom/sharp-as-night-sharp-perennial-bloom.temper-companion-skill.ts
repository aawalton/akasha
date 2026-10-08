import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const sharpAsNightSharpPerennialBloom = {
  id: "019e6484-389a-7844-81b6-ab0e6c0b23e5",
  type: "page-type/temper-companion-skill",
  slug: "sharp-as-night-sharp-perennial-bloom",
  key: "sharp-perennial-bloom",
  title: "Perennial Bloom",
  icon: "/esoui/art/icons/ability_companion_warden_healingseed.dds",
  description:
    "Your Companion summons a field of blooming flowers, healing you and nearby allies for $1 Health every 2 seconds over $$1 seconds.",
  companionId: "temper-eso-companion/sharp-as-night",
  abilityId: 186602,
  skillLineId: "temper-companion-skill-line/companion-sharp-as-night-verdant-growth",
  skillType: "temper-skill-type/active",
  validRoles: ["healer"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
  createdAt: "2026-05-26T13:40:47.386Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
