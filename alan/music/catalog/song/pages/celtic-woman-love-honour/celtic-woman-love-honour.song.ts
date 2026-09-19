import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanLoveHonour = {
  id: "01a0b771-5180-70ec-b155-cfae947cc337",
  type: "page-type/song",
  slug: "celtic-woman-love-honour",
  title: "Love & Honour",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
