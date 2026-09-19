import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanNewgrange = {
  id: "01a0b771-416a-7011-8299-4f22511d71f3",
  type: "page-type/song",
  slug: "celtic-woman-newgrange",
  title: "Newgrange",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
