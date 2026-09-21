import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineNotAgain = {
  id: "01a0c621-22db-7b73-84cf-58945bda878b",
  type: "page-type/song",
  slug: "jenna-raine-not-again",
  title: "NOT AGAIN",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
