import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysEnchanted = {
  id: "01a0b780-d658-7ad4-91c7-006b9826ac51",
  type: "page-type/song",
  slug: "the-piano-guys-enchanted",
  title: "Enchanted",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
