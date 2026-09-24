import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePleasePleasePleasePlease = {
  id: "01a0b111-2aec-75cd-8f02-48cf06f08688",
  type: "page-type/track",
  slug: "sabrina-carpenter-please-please-please-please-please-please",
  ownLength: 3.1060833333333333,
  ownProgress: 3.1060833333333333,
  partOfCollections: [
    "release/sabrina-carpenter-please-please-please",
    "release/sabrina-carpenter-short-n-sweet",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Please Please Please",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "pleasepleaseplease|74KM79TiuVKeVCqs8QtB0B|186365",
  song: "song/sabrina-carpenter-please-please-please",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-please-please-please",
      discNumber: 1,
      position: 1,
      externalId: "5N3hjp1WNayUPZrA8kJmJP",
      externalLink: "https://open.spotify.com/track/5N3hjp1WNayUPZrA8kJmJP",
    },
    {
      release: "release/sabrina-carpenter-short-n-sweet",
      discNumber: 1,
      position: 2,
      externalId: "2tHwzyyOLoWSFqYNjeVMzj",
      externalLink: "https://open.spotify.com/track/2tHwzyyOLoWSFqYNjeVMzj",
    },
  ],
} as const satisfies Track
