import type { World } from "akasha/story/world/world.page-type.types.ts"

export const encounters = {
  id: "01a112ff-0b08-7965-a61b-0039dba8ba6d",
  type: "page-type/world",
  slug: "encounters",
  title: "Encounters",
  description:
    "The real world, now, with Alan as himself. He is the same man in every chapter, and what happened to him in earlier chapters stays his history. Each chapter is its own place and its own night, set by the premise Alan gives for it.",
} as const satisfies World
