import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappEverythingToEveryone = {
  id: "01a0caa9-0ffe-7029-aa69-bb3c85cdc48b",
  type: "page-type/song",
  slug: "renee-rapp-everything-to-everyone",
  title: "Everything To Everyone",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
