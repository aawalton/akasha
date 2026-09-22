import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxSalemWitch = {
  id: "01a0c95d-fc00-7591-8f5b-33e102fb542d",
  type: "page-type/song",
  slug: "lilith-max-salem-witch",
  title: "Salem Witch",
  artist: "artist/lilith-max",
  performed: true,
} as const satisfies Song
