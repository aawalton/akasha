import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherClaim = {
  id: "01a10219-9aae-7ae3-89ca-90a3db69c6cc",
  type: "page-type/world-skill",
  slug: "fairweather-claim",
  title: "Claim",
  world: "world/fairweather",
  description: "An Enthraller skill that claims a person as the caster's own.",
} as const satisfies WorldSkill
