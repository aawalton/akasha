import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSerenity = {
  id: "01a0b77d-8686-74c0-8859-c4431c83f2f3",
  type: "page-type/song",
  slug: "paul-cardall-serenity",
  title: "Serenity",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
