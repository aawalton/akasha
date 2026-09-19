import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWasntThatAMightyStorm = {
  id: "01a0b779-778d-7217-b2a9-4d9da7c6dfc7",
  type: "page-type/song",
  slug: "james-taylor-wasnt-that-a-mighty-storm",
  title: "Wasn't That a Mighty Storm",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
