import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const solarRayWideDiffusion = {
  id: "01a06572-95e1-7639-b2d7-7455f2d5c9f8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "solar-ray-wide-diffusion",
  title: "Solar Ray: Wide Diffusion",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
