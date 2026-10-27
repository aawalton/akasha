import type { StoryItem } from "akasha/story/world/mechanics/items/story-item/story-item.page-type.types.ts"

export const theTowerLeechGlutColdMouths = {
  id: "01a0d3dd-cfd0-7bd3-9d62-23266e251f2c",
  type: "page-type/story-item",
  slug: "the-tower-leech-glut-cold-mouths",
  title: "Cold mouths",
  story: "story-played/the-tower",
  character: "character-other/the-tower-leech-glut-01",
  slot: "item-slot/body",
  description:
    "Dozens of cold mouths on a slick mass of leech-things that latch, sap the strength from a limb, and haul a body under the water.",
  category: "weapon",
  createdAt: "2026-09-24T14:42:04.368Z",
  updatedAt: "2026-10-27T18:59:43.093Z",
} as const satisfies StoryItem
