import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterThatsNotHowThisWorks = {
  id: "01a0b77e-e979-7fe0-9a4c-c416cc8d5238",
  type: "page-type/song",
  slug: "sabrina-carpenter-thats-not-how-this-works",
  title: "That’s Not How This Works",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
