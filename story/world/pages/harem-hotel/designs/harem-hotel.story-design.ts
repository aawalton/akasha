import type { StoryDesign } from "akasha/story/world/designs/story-design.page-type.types.ts"

export const haremHotel = {
  id: "01a0e820-8352-7af8-8ee8-2c82d3544c25",
  type: "page-type/story-design",
  slug: "harem-hotel",
  title: "Harem Hotel — story design",
  world: "world/harem-hotel",
  premise: "md",
  genre: "explicit erotic fantasy",
  visualStyle: "fantasy photorealistic",
  narrator: 'Second person, present tense: the reader is "you", Alan as himself.',
  imageSeed: 724518093,
} as const satisfies StoryDesign
