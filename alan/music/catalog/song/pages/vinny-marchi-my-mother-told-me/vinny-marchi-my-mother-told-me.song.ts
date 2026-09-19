import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiMyMotherToldMe = {
  id: "01a0b783-bd19-753e-ba3e-0d29b0ec3cad",
  type: "page-type/song",
  slug: "vinny-marchi-my-mother-told-me",
  title: "My Mother Told Me",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
