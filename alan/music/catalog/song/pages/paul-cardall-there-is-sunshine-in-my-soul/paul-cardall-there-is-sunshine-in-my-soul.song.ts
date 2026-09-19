import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallThereIsSunshineInMySoul = {
  id: "01a0b779-c927-7045-b44c-bad22f8945b5",
  type: "page-type/song",
  slug: "paul-cardall-there-is-sunshine-in-my-soul",
  title: "There Is Sunshine in My Soul",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
