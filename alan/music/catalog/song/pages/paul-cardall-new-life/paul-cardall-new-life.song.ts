import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallNewLife = {
  id: "01a0b77d-e111-77e2-81b5-8393416e7c79",
  type: "page-type/song",
  slug: "paul-cardall-new-life",
  title: "New Life",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
