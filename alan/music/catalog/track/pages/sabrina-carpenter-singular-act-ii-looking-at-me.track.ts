import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiLookingAtMe = {
  id: "01a0b111-25f2-7e94-a78e-63ce2df4c09a",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-looking-at-me",
  ownLength: 3.018666666666667,
  ownProgress: 3.018666666666667,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  status: "completed",
  unit: "unit/minutes",
  title: "Looking at Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "lookingatme|74KM79TiuVKeVCqs8QtB0B|181120",
  song: "song/sabrina-carpenter-looking-at-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-ii",
      discNumber: 1,
      position: 9,
      externalId: "59tskctgqUmjCWAwhzYAFm",
      externalLink: "https://open.spotify.com/track/59tskctgqUmjCWAwhzYAFm",
    },
  ],
} as const satisfies Track
