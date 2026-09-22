import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappMessy = {
  id: "01a0caa9-0a88-7285-b293-ebd0105855f1",
  type: "page-type/song",
  slug: "renee-rapp-messy",
  title: "Messy",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
