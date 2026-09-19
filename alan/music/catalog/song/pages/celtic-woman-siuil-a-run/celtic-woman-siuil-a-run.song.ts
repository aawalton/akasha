import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSiuilARun = {
  id: "01a0b771-7d28-7d07-8c23-53cf23c537dc",
  type: "page-type/song",
  slug: "celtic-woman-siuil-a-run",
  title: "Siúil a Rún",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
