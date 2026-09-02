import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpSleetmail = {
  id: "01a05fd0-1d83-7134-820d-87b82c84f28b",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-sleetmail",
  key: "sharp-sleetmail",
  title: "Sleetmail",
  icon: "/esoui/art/icons/ability_companion_warden_frostcloak.dds",
  description:
    "Your Companion conjures ice armor for themselves and nearby grouped allies. Your Companion reduces their Damage Taken by 20% for $$1 seconds. Allies gain Major Resolve, increasing Physical and Spell Resistance by 5948 for $$2 seconds.",
  companionId: "sharp-as-night",
  abilityId: 186603,
  skillLineId: "companion-sharp-as-night-winters-bite",
  skillType: "active",
  validRoles: ["tank", "support"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
