import type { TemperCompanionSkill } from "../temper-companion-skill.page-type.ts"

export const isobelIsobelHolyGround = {
  id: "019e6484-3874-74af-87c2-31b60ccb5492",
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
  skillEffects: "jsonl",
  castConditions: "jsonl",
} as const satisfies TemperCompanionSkill
