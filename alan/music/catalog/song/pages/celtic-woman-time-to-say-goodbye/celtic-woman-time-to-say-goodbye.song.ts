import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTimeToSayGoodbye = {
  id: "01a0b779-5215-79fc-b9ca-ce2bb67b60b7",
  type: "page-type/song",
  slug: "celtic-woman-time-to-say-goodbye",
  title: "Time To Say Goodbye",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
