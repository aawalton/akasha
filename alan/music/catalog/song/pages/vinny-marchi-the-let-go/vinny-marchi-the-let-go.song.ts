import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiTheLetGo = {
  id: "01a0b783-deb2-73dc-a0aa-6e0b2759e771",
  type: "page-type/song",
  slug: "vinny-marchi-the-let-go",
  title: "The Let Go",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
