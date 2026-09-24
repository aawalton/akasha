import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendNobodysSon = {
  id: "01a0b111-1bed-73f0-bfa8-fedb573bedd9",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-nobodys-son",
  ownLength: 3.0429333333333335,
  ownProgress: 3.0429333333333335,
  partOfCollections: [
    "release/sabrina-carpenter-man-s-best-friend",
    "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Nobody’s Son",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "nobodysson|74KM79TiuVKeVCqs8QtB0B|182576",
  song: "song/sabrina-carpenter-nobodys-son",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-man-s-best-friend",
      discNumber: 1,
      position: 6,
      externalId: "4SRShYMtFIGgnOU7iBicMH",
      externalLink: "https://open.spotify.com/track/4SRShYMtFIGgnOU7iBicMH",
    },
    {
      release: "release/sabrina-carpenter-mans-best-friend-bonus-track-version",
      discNumber: 1,
      position: 6,
      externalId: "67T3TWkCiIB6BXjIWE2Hgb",
      externalLink: "https://open.spotify.com/track/67T3TWkCiIB6BXjIWE2Hgb",
    },
  ],
} as const satisfies Track
