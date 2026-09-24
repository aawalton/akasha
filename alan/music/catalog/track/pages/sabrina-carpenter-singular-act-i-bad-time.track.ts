import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIBadTime = {
  id: "01a0b111-26b0-7555-b41d-2377991e9b1c",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-bad-time",
  ownLength: 3.07555,
  ownProgress: 3.07555,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "badtime|74KM79TiuVKeVCqs8QtB0B|184533",
  song: "song/sabrina-carpenter-bad-time",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-i",
      discNumber: 1,
      position: 6,
      externalId: "1YqPDOmooQQIXsRSdbRrwI",
      externalLink: "https://open.spotify.com/track/1YqPDOmooQQIXsRSdbRrwI",
    },
  ],
} as const satisfies Track
