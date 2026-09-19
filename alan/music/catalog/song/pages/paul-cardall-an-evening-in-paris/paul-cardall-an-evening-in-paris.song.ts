import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAnEveningInParis = {
  id: "01a0b77c-e8f4-7356-9036-252bae0b0fbf",
  type: "page-type/song",
  slug: "paul-cardall-an-evening-in-paris",
  title: "An Evening In Paris",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
