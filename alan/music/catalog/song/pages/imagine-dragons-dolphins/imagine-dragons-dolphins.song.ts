import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDolphins = {
  id: "01a0c43f-e579-7394-9886-8086e3657cd9",
  type: "page-type/song",
  slug: "imagine-dragons-dolphins",
  title: "Dolphins",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
