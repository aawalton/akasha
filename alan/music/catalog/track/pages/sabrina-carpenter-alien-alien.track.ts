import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterAlienAlien = {
  id: "01a0b111-31d1-7d05-a980-83e43cb8b23c",
  type: "page-type/track",
  slug: "sabrina-carpenter-alien-alien",
  ownLength: 2.914,
  ownProgress: 2.914,
  partOfCollections: ["release/sabrina-carpenter-alien"],
  status: "completed",
  unit: "unit/minutes",
  title: "Alien",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }, { artistName: "Jonas Blue" }],
  trackKey: "alien|1HBjj22wzbscIZ9sEb5dyf,74KM79TiuVKeVCqs8QtB0B|174840",
  song: "song/sabrina-carpenter-alien",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-alien",
      discNumber: 1,
      position: 1,
      externalId: "0RUTnY2B3s05fZuCHsNaUP",
      externalLink: "https://open.spotify.com/track/0RUTnY2B3s05fZuCHsNaUP",
    },
  ],
} as const satisfies Track
