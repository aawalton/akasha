import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorICanDreamOfYou = {
  id: "01a0b779-78ec-71f4-ad04-b7374a37b870",
  type: "page-type/song",
  slug: "james-taylor-i-can-dream-of-you",
  title: "I Can Dream of You",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
