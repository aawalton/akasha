import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWhenYouGo = {
  id: "01a0b771-991d-7b5f-9359-9fe5b5323a4d",
  type: "page-type/song",
  slug: "celtic-woman-when-you-go",
  title: "When You Go",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
