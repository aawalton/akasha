import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineLovesick = {
  id: "01a0c621-1df2-7b5b-b0e9-0b29f4b97829",
  type: "page-type/song",
  slug: "jenna-raine-lovesick",
  title: "Lovesick",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
