import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const azandarAzandarShieldsOfErudition = {
  id: "01a05fd0-1d75-76b5-8a2f-3497cc83cd5e",
  pageTypeSlug: "temper-companion-skill",
  slug: "azandar-azandar-shields-of-erudition",
  key: "azandar-shields-of-erudition",
  title: "Shields of Erudition",
  icon: "/esoui/art/icons/ability_companion_arcanist_tidalshield.dds",
  description:
    "Your Companion manifests spinning discs of pure knowledge to surround themselves and up to 2 allies, granting a damage shield that absorbs $1 damage for $$1 seconds.",
  companionId: "azandar",
  abilityId: 192937,
  skillLineId: "companion-azandar-revitalizing-researcher",
  skillType: "active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
