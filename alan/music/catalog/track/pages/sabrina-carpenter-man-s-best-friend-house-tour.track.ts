import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendHouseTour = {
  id: "01a0b111-1ca6-71b8-a76b-5acd359a6fd2",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-house-tour",
  ownLength: 2.8202333333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-man-s-best-friend"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25jgQBxuUkGDdCG1WGKKN9",
      externalLink: "https://open.spotify.com/track/25jgQBxuUkGDdCG1WGKKN9",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "House Tour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "housetour|74KM79TiuVKeVCqs8QtB0B|169214",
} as const satisfies Track
