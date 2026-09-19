import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiTheBastardInTheKitchen = {
  id: "01a0b783-d73a-751f-ac7b-8d18d41f8564",
  type: "page-type/song",
  slug: "vinny-marchi-the-bastard-in-the-kitchen",
  title: "The Bastard in the Kitchen",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
