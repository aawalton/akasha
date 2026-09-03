import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const sharpAsNightSharpPetalsOfTheHunter = {
  id: "019e6484-389b-7e6f-afeb-c65964fc717d",
  pageTypeSlug: "temper-companion-skill",
  slug: "sharp-as-night-sharp-petals-of-the-hunter",
  key: "sharp-petals-of-the-hunter",
  title: "Petals of the Hunter",
  icon: "/esoui/art/icons/ability_companion_warden_lotusflower.dds",
  description:
    "Your Companion calls on the essence of a carnivorous bloom, causing their Light Attacks to restore $1 Health to themselves or up to 2 nearby allies for $$1 seconds.",
  companionId: "sharp-as-night",
  abilityId: 186601,
  skillLineId: "companion-sharp-as-night-verdant-growth",
  skillType: "active",
  validRoles: ["healer", "tank"],
  skillEffects: "jsonl",
} as const satisfies TemperCompanionSkill
