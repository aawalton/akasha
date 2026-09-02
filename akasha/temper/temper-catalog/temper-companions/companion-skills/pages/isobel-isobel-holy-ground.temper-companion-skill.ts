import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelHolyGround = {
  id: "01a05fd0-1d7e-72cd-9944-0f9f50bfa817",
  pageTypeSlug: "temper-companion-skill",
  slug: "isobel-isobel-holy-ground",
  key: "isobel-holy-ground",
  title: "Holy Ground",
  icon: "/esoui/art/icons/ability_companion_templar_cleansing_ritual.dds",
  description:
    "Your Companion consecrates the ground under them for $$1 seconds, healing themselves and nearby allies $1 Health every 2 seconds and snaring enemies by 50%.",
  companionId: "isobel",
  abilityId: 163660,
  skillLineId: "companion-isobel-healing-grace",
  skillType: "active",
  validRoles: ["healer", "tank"],
} as const satisfies TemperCompanionSkill
