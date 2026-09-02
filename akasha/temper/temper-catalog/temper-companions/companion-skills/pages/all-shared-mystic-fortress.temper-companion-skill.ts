import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const allSharedMysticFortress = {
  id: "01a05fd0-1d6e-71e1-8b06-ddcf36f992d8",
  pageTypeSlug: "temper-companion-skill",
  slug: "all-shared-mystic-fortress",
  key: "shared-mystic-fortress",
  title: "Mystic Fortress",
  icon: "/esoui/art/icons/ability_companion_restorationstaff_001.dds",
  description:
    "Your Companion calls on their staff's strength to protect themselves or the lowest health ally around them, granting a damage shield that absorbs $1 damage over $$1 seconds.",
  companionId: "all",
  abilityId: 153685,
  skillLineId: "weapon-restoration-staff",
  skillType: "active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
