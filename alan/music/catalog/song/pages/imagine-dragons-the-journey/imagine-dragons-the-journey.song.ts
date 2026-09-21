import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTheJourney = {
  id: "01a0c43f-b3ef-758a-a760-cc8012ebb370",
  type: "page-type/song",
  slug: "imagine-dragons-the-journey",
  title: "The Journey",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
