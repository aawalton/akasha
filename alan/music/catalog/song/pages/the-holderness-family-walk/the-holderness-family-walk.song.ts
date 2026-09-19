import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyWalk = {
  id: "01a0b77f-a356-78b6-addf-b6225ba74d97",
  type: "page-type/song",
  slug: "the-holderness-family-walk",
  title: "Walk!",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
