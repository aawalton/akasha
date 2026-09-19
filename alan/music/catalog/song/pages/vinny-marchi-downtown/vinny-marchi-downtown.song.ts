import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiDowntown = {
  id: "01a0b783-8f26-743c-a49c-0577dc349b85",
  type: "page-type/song",
  slug: "vinny-marchi-downtown",
  title: "Downtown",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
