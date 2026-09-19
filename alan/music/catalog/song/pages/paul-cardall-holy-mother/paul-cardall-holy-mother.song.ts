import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHolyMother = {
  id: "01a0b77d-1ba0-746b-a243-0624b74b40b2",
  type: "page-type/song",
  slug: "paul-cardall-holy-mother",
  title: "Holy Mother",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
