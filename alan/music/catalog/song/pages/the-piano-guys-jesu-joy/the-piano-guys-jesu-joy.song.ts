import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysJesuJoy = {
  id: "01a0b780-69fc-7210-8847-087ac725e1b3",
  type: "page-type/song",
  slug: "the-piano-guys-jesu-joy",
  title: "Jesu Joy",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
