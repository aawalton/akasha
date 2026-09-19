import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLullabyeGoodnightMyAngel = {
  id: "01a0b780-6b23-7575-9a69-ca7e3a2c8f00",
  type: "page-type/song",
  slug: "the-piano-guys-lullabye-goodnight-my-angel",
  title: "Lullabye (Goodnight, My Angel)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
