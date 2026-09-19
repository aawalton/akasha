import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLifeAndDeath = {
  id: "01a0b77d-dfb9-73ed-ac92-dd3c1436da49",
  type: "page-type/song",
  slug: "paul-cardall-life-and-death",
  title: "Life and Death",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
