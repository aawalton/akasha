import type { TowerElement } from "akasha/story/world/pages/personas/stories/played/the-tower/mechanics/elements/tower-element.page-type.types.ts"

export const theTowerForce = {
  id: "01a0ca6e-65f5-788d-9ca5-6159a2e06b1e",
  type: "page-type/tower-element",
  slug: "the-tower-force",
  title: "Force",
  description: "Stored mechanical force — load, tension, and momentum held ready to release.",
} as const satisfies TowerElement
