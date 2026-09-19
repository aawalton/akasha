import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorInTheBleakMidwinter = {
  id: "01a0b779-870c-72a3-a2f7-44c3393ac1db",
  type: "page-type/song",
  slug: "james-taylor-in-the-bleak-midwinter",
  title: "In The Bleak Midwinter",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
