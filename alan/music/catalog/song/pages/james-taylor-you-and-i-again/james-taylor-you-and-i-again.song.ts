import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorYouAndIAgain = {
  id: "01a0b779-614c-7f6c-95c4-f24e9b4c166c",
  type: "page-type/song",
  slug: "james-taylor-you-and-i-again",
  title: "You And I Again",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
