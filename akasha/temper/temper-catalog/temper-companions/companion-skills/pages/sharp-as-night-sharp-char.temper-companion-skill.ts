import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpChar = {
  id: "019e6484-3892-7f34-9e51-49d065626749",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-char",
  key: "sharp-char",
  title: "Char",
  icon: "/esoui/art/icons/ability_companion_warden_scorch.dds",
  description:
    "Your Companion unearths a group of fiery shalk that attack dealing $1 Magic Damage to enemies in front of them. After the shalk complete their attack, they burrow underground for 3 seconds and resurface again, dealing $2 Magic Damage to enemies in front of them.",
  companionId: "sharp-as-night",
  abilityId: 186486,
  skillLineId: "companion-sharp-as-night-beasts-of-the-hunt",
  skillType: "active",
  validRoles: ["dps"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
