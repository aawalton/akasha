import type { Item } from "akasha/story/item/item.page-type.types.ts"

export const theTowerLeechGlutColdMouths = {
  id: "01a0d3dd-cfd0-7bd3-9d62-23266e251f2c",
  type: "page-type/item",
  slug: "the-tower-leech-glut-cold-mouths",
  title: "Cold mouths",
  story: "story-played/the-tower",
  character: "character-other/the-tower-leech-glut-01",
  slot: "item-slot/body",
  description:
    "Dozens of cold mouths on a slick mass of leech-things that latch, sap the strength from a limb, and haul a body under the water.",
} as const satisfies Item
