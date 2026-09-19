import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyDoYouWantTo = {
  id: "01a0b77f-dcaf-7633-9ead-aad0eb692efd",
  type: "page-type/song",
  slug: "the-holderness-family-do-you-want-to",
  title: "Do You Want To...",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
