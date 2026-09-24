import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const ejaeMadeMyNight = {
  id: "01a0d3ab-21a3-7d02-a11f-8d796c928c20",
  type: "page-type/song",
  slug: "ejae-made-my-night",
  title: "Made My Night",
  artist: "artist/ejae",
  performed: true,
} as const satisfies Song
