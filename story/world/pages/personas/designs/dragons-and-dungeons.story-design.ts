import type { StoryDesign } from "akasha/story/world/designs/story-design.page-type.types.ts"

export const dragonsAndDungeons = {
  id: "01a0657d-bb8d-7c2e-b887-6f19b2ee678c",
  type: "page-type/story-design",
  slug: "dragons-and-dungeons",
  title: "Dragons & Dungeons — story design",
  world: "world/personas",
  premise: "md",
  genre: "Fantasy, Romance, Tabletop",
  tone: "Warm, mischievous, sensual.",
  visualStyle:
    "cozy candlelit fantasy-romance art; warm flickering amber lamplight; rich jewel tones — silver, amethyst, and deep black — over wood and velvet; soft glowing shadow; lush painterly finish, mischievous and inviting",
  readerFraming: "First person, from the mortal's perspective.",
  narrator:
    "The monk, in first person, throughout. Every other character is third person, Aria speaking as the voice of the world while the tale is running.",
  structure:
    "Two frames at once, and knowing which one a line is in is the whole trick of it. The Table is the balcony of Caer Arianrhod, where the real people are playing; the Game World is the tale they are playing. Alan is the player at the table and the monk in the tale. Aria is the game master at the table and the voice of the world in the tale. Mari is herself at the table and the wet-haired girl in the tale. Ceri is the empty seat, not yet arrived, and is never in the tale at all. Dissolve imagery marks every passage from one frame to the other, at the boundary and nowhere else; inside a frame nothing is marked line by line. A chapter may close on an in-world choice put to Alan, which he answers in his own words; it stops at that threshold and never tells what he chose.",
  author: "Alan & the table",
} as const satisfies StoryDesign
