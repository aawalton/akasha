import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysOHolyNightAveMaria = {
  id: "01a0b780-288b-7216-ad0e-f7beab53f353",
  type: "page-type/song",
  slug: "the-piano-guys-o-holy-night-ave-maria",
  title: "O Holy Night / Ave Maria",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
