import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiExhale = {
  id: "01a0b111-25a7-75cc-95d0-5402b6e92af2",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-exhale",
  ownLength: 2.7451333333333334,
  ownProgress: 2.7451333333333334,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "Exhale",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "exhale|74KM79TiuVKeVCqs8QtB0B|164708",
  song: "song/sabrina-carpenter-exhale",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-ii",
      discNumber: 1,
      position: 7,
      externalId: "6CagMrZXJUdGGIw6Eaepos",
      externalLink: "https://open.spotify.com/track/6CagMrZXJUdGGIw6Eaepos",
    },
  ],
} as const satisfies Track
