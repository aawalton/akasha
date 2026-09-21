import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDrive = {
  id: "01a0c43f-e800-781a-bde4-149e6e5774f8",
  type: "page-type/song",
  slug: "imagine-dragons-drive",
  title: "Drive",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
