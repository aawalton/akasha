import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsPlayinMe = {
  id: "01a0c43f-b2d9-7b54-baff-e891040fd81a",
  type: "page-type/song",
  slug: "imagine-dragons-playin-me",
  title: "Playin' Me",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
