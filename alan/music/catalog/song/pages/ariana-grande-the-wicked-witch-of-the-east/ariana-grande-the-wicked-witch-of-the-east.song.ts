import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheWickedWitchOfTheEast = {
  id: "01a0b770-195e-730b-9ae4-3274f2293ae5",
  type: "page-type/song",
  slug: "ariana-grande-the-wicked-witch-of-the-east",
  title: "The Wicked Witch of the East",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
