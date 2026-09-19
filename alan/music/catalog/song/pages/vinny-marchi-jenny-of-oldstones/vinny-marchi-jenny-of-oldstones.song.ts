import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiJennyOfOldstones = {
  id: "01a0b783-ae7a-7179-ad7b-ef427ed84539",
  type: "page-type/song",
  slug: "vinny-marchi-jenny-of-oldstones",
  title: "Jenny Of Oldstones",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
