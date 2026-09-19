import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGraciesTheme = {
  id: "01a0b77d-8b54-7071-a38a-9960e8c7e4ab",
  type: "page-type/song",
  slug: "paul-cardall-gracies-theme",
  title: "Gracie's Theme",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
