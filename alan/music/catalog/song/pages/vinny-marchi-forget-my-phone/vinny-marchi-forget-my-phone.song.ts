import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiForgetMyPhone = {
  id: "01a0b783-a1c6-7c9e-8192-620b19ba93b7",
  type: "page-type/song",
  slug: "vinny-marchi-forget-my-phone",
  title: "Forget My Phone",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
