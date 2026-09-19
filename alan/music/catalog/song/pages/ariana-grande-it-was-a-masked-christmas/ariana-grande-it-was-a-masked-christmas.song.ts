import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeItWasAMaskedChristmas = {
  id: "01a0b76f-e3ab-7076-8687-097d5061eded",
  type: "page-type/song",
  slug: "ariana-grande-it-was-a-masked-christmas",
  title: "It Was A… (Masked Christmas)",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
