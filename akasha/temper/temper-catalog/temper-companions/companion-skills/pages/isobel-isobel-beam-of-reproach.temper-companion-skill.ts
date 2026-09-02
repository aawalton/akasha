import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelBeamOfReproach = {
  id: "01a05fd0-1d7d-755f-b3ee-2bbd9ea5dbed",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-beam-of-reproach",
  key: "isobel-beam-of-reproach",
  title: "Beam of Reproach",
  icon: "/esoui/art/icons/ability_companion_templar_purifying_light.dds",
  description:
    "Your Companion bathes an enemy in a beam of sunlight, immediately dealing $1 Magic Damage and healing allies nearby for $2 Health. The residual light will then continue to heal allies near the enemy for $3 Health every 2 seconds for $$3 seconds.",
  companionId: "isobel",
  abilityId: 163684,
  skillLineId: "companion-isobel-healing-grace",
  skillType: "active",
  validRoles: ["dps", "healer"],
} as const satisfies TemperCompanionSkill
