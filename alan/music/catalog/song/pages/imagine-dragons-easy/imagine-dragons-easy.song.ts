import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsEasy = {
  id: "01a0c43f-e69c-7224-9d23-1d102efcd73a",
  type: "page-type/song",
  slug: "imagine-dragons-easy",
  title: "Easy",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
