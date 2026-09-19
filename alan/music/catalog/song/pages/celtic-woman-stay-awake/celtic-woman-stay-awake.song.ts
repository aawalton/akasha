import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanStayAwake = {
  id: "01a0b779-1a86-7f98-b763-0ab37b4eb3fc",
  type: "page-type/song",
  slug: "celtic-woman-stay-awake",
  title: "Stay Awake",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
