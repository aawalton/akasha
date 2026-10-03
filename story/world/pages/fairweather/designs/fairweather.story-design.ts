import type { StoryDesign } from "akasha/story/world/designs/story-design.page-type.types.ts"

export const fairweather = {
  id: "01a10213-ce06-7e7e-b213-b813bed196b1",
  type: "page-type/story-design",
  slug: "fairweather",
  title: "Fairweather — story design",
  world: "world/fairweather",
  premise: "md",
  genre: "cozy LitRPG slice of life and yuri romantic comedy, all tension and no sex",
  visualStyle: "fantasy photorealistic",
  narrator: "Third person, past tense, close on Elsie alone.",
  imageSeed: 268401937,
} as const satisfies StoryDesign
