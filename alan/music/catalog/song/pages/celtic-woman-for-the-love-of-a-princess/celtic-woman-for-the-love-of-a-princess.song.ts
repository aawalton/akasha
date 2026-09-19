import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanForTheLoveOfAPrincess = {
  id: "01a0b771-a908-7c77-abb8-8e16cda2a027",
  type: "page-type/song",
  slug: "celtic-woman-for-the-love-of-a-princess",
  title: "For The Love Of A Princess",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
