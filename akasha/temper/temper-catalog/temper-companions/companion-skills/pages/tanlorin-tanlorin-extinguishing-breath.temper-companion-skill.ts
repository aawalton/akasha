import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const tanlorinTanlorinExtinguishingBreath = {
  id: "01a05fd0-1d85-7b45-9729-ef1d1eff2af9",
  pageTypeSlug: "temper-companion-skill",
  slug: "tanlorin-tanlorin-extinguishing-breath",
  key: "tanlorin-extinguishing-breath",
  title: "Extinguishing Breath",
  icon: "/esoui/art/icons/ability_companion_tanlorin_extinguishingbreath.dds",
  description:
    "Your Companion channels draconic energy to suck in the air around them, dealing $1 Flame Damage to nearby enemies and healing themselves for $2 Health. Any enemy hit that is casting is interrupted and stunned for $$4 seconds. After 2.5 seconds, they exhale fire dealing $3 Flame Damage to nearby enemies.",
  companionId: "tanlorin",
  abilityId: 215042,
  skillLineId: "companion-tanlorin-draconic-armor",
  skillType: "active",
  validRoles: ["dps", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
