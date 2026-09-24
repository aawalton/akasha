import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendHouseTour = {
  id: "01a0b111-1ca6-71b8-a76b-5acd359a6fd2",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-house-tour",
  ownLength: 2.8202333333333334,
  ownProgress: 2.8202333333333334,
  partOfCollections: [
    "release/sabrina-carpenter-man-s-best-friend",
    "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "House Tour",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "housetour|74KM79TiuVKeVCqs8QtB0B|169214",
  song: "song/sabrina-carpenter-house-tour",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-man-s-best-friend",
      discNumber: 1,
      position: 11,
      externalId: "25jgQBxuUkGDdCG1WGKKN9",
      externalLink: "https://open.spotify.com/track/25jgQBxuUkGDdCG1WGKKN9",
    },
    {
      release: "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
      discNumber: 1,
      position: 11,
      externalId: "01oKQDSb3WHN5NeMNCo4uM",
      externalLink: "https://open.spotify.com/track/01oKQDSb3WHN5NeMNCo4uM",
    },
  ],
} as const satisfies Track
