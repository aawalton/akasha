import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappIHateBoston = {
  id: "01a0caa9-079a-756d-9202-016b92d0eb8a",
  type: "page-type/song",
  slug: "renee-rapp-i-hate-boston",
  title: "I Hate Boston",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
