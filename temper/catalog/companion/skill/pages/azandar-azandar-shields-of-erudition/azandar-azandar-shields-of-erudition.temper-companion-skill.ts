import type { TemperCompanionSkill } from "akasha/temper/catalog/companion/skill/temper-companion-skill.page-type.types.ts"

export const azandarAzandarShieldsOfErudition = {
  id: "019e6484-383d-73dd-b1a3-602400be1e6d",
  type: "page-type/temper-companion-skill",
  slug: "azandar-azandar-shields-of-erudition",
  key: "azandar-shields-of-erudition",
  title: "Shields of Erudition",
  icon: "/esoui/art/icons/ability_companion_arcanist_tidalshield.dds",
  description:
    "Your Companion manifests spinning discs of pure knowledge to surround themselves and up to 2 allies, granting a damage shield that absorbs $1 damage for $$1 seconds.",
  companionId: "temper-eso-companion/azandar",
  abilityId: 192937,
  skillLineId: "temper-companion-skill-line/companion-azandar-revitalizing-researcher",
  skillType: "temper-skill-type/active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
  createdAt: "2026-05-26T13:40:47.293Z",
  updatedAt: "2026-09-22T20:39:10.000Z",
} as const satisfies TemperCompanionSkill
