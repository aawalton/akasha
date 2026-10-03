import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherCaptivate = {
  id: "01a10218-8a63-771f-8524-6d25b57b59b6",
  type: "page-type/world-skill",
  slug: "fairweather-captivate",
  title: "Captivate",
  world: "world/fairweather",
  description:
    "An Enthraller skill that draws a person's whole attention to the caster and holds it.",
} as const satisfies WorldSkill
