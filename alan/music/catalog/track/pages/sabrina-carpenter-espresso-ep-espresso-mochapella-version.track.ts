import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEspressoEpEspressoMochapellaVersion = {
  id: "01a0b111-2c16-797a-909c-9f2aa0bbb41e",
  type: "page-type/track",
  slug: "sabrina-carpenter-espresso-ep-espresso-mochapella-version",
  ownLength: 2.9243166666666665,
  ownProgress: 2.9243166666666665,
  partOfCollections: ["release/sabrina-carpenter-espresso-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "Espresso - Mochapella Version",
  trackType: "version",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "espressomochapellaversion|74KM79TiuVKeVCqs8QtB0B|175459",
  song: "song/sabrina-carpenter-espresso",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-espresso-ep",
      discNumber: 1,
      position: 5,
      externalId: "4I7dAz8IaDk76QK3n3eJir",
      externalLink: "https://open.spotify.com/track/4I7dAz8IaDk76QK3n3eJir",
    },
  ],
} as const satisfies Track
