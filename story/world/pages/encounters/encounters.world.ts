import type { World } from "akasha/story/world/world.page-type.types.ts"

export const encounters = {
  id: "01a112ff-0b08-7965-a61b-0039dba8ba6d",
  type: "page-type/world",
  slug: "encounters",
  title: "Encounters",
  description:
    "No one world. Each chapter is its own place and its own night, set by the premise Alan gives for it, and nothing carries from one chapter to the next unless he says so.",
} as const satisfies World
