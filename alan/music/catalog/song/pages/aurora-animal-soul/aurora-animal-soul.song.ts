import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAnimalSoul = {
  id: "01a0b770-3463-7950-b714-3eee5089991f",
  type: "page-type/song",
  slug: "aurora-animal-soul",
  title: "Animal Soul",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
