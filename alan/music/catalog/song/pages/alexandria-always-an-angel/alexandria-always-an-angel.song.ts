import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaAlwaysAnAngel = {
  id: "01a0b76f-ce81-7335-8653-dd78e4bce2b9",
  type: "page-type/song",
  slug: "alexandria-always-an-angel",
  title: "Always an Angel",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
