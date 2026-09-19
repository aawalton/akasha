import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanIllBeHomeForChristmas = {
  id: "01a0b771-9f27-7aa7-b7ed-fdb1d1f88005",
  type: "page-type/song",
  slug: "celtic-woman-ill-be-home-for-christmas",
  title: "I'll Be Home For Christmas",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
