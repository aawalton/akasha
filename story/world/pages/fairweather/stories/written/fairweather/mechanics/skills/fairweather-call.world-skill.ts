import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherCall = {
  id: "01a1021a-bf13-7bcb-aeb6-5667a5d348ff",
  type: "page-type/world-skill",
  slug: "fairweather-call",
  title: "Call",
  world: "world/fairweather",
  description: "An Enthraller skill that calls a bound person to the caster's side from afar.",
  createdAt: "2026-10-03T14:11:09.715Z",
  updatedAt: "2026-10-03T14:11:19.000Z",
} as const satisfies WorldSkill
