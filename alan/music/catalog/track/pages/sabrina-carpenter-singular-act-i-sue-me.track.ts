import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActISueMe = {
  id: "01a0b111-2671-7f40-8662-eb23c093191d",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-i-sue-me",
  ownLength: 2.9871,
  ownProgress: 2.9871,
  partOfCollections: ["release/sabrina-carpenter-singular-act-i"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sue Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "sueme|74KM79TiuVKeVCqs8QtB0B|179226",
  song: "song/sabrina-carpenter-sue-me",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-singular-act-i",
      discNumber: 1,
      position: 4,
      externalId: "3WVhkjB7Y4xFruqoCAajBb",
      externalLink: "https://open.spotify.com/track/3WVhkjB7Y4xFruqoCAajBb",
    },
  ],
} as const satisfies Track
