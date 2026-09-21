import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsCowboy = {
  id: "01a0c43f-b363-716c-a8cb-0cdc2d30213a",
  type: "page-type/song",
  slug: "imagine-dragons-cowboy",
  title: "Cowboy",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
