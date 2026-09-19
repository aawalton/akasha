import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorStretchOfTheHighway = {
  id: "01a0b779-5c54-765c-b2dd-127687625d46",
  type: "page-type/song",
  slug: "james-taylor-stretch-of-the-highway",
  title: "Stretch Of The Highway",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
