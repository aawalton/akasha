import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinRuinousOutburst = {
  id: "019e6484-38a8-733f-bac6-da554a2d8bdf",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-ruinous-outburst",
  key: "tanlorin-ruinous-outburst",
  title: "Ruinous Outburst",
  icon: "/esoui/art/icons/ability_companion_tanlorin_wavesofpower.dds",
  description:
    "Your Companion swipes each hand, sending a massive wave of power to crash into enemies in front of them, dealing $1 Magic Damage followed by a second wave after 0.5 seconds dealing $2 Magic Damage. Enemies hit are knocked back and stunned for $$4 seconds.",
  companionId: "tanlorin",
  abilityId: 215215,
  skillLineId: "companion-tanlorin",
  skillType: "ultimate",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
