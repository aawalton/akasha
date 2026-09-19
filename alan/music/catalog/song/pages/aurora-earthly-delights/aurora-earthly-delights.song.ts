import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraEarthlyDelights = {
  id: "01a0b770-ea00-7ef9-b586-5a098bbebb07",
  type: "page-type/song",
  slug: "aurora-earthly-delights",
  title: "Earthly Delights",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
