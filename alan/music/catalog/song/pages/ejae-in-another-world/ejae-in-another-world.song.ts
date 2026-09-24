import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const ejaeInAnotherWorld = {
  id: "01a0d3ab-2376-7645-8667-55577f18cfcc",
  type: "page-type/song",
  slug: "ejae-in-another-world",
  title: "In Another World",
  artist: "artist/ejae",
  performed: true,
} as const satisfies Song
