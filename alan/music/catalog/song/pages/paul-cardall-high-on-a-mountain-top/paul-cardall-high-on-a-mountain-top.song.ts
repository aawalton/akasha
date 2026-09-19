import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHighOnAMountainTop = {
  id: "01a0b779-af94-709d-8339-32f218ae3c30",
  type: "page-type/song",
  slug: "paul-cardall-high-on-a-mountain-top",
  title: "High On a Mountain Top",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
