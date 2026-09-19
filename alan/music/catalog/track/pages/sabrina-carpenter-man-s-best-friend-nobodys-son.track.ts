import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendNobodysSon = {
  id: "01a0b111-1bed-73f0-bfa8-fedb573bedd9",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-nobodys-son",
  ownLength: 3.0429333333333335,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-man-s-best-friend"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4SRShYMtFIGgnOU7iBicMH",
      externalLink: "https://open.spotify.com/track/4SRShYMtFIGgnOU7iBicMH",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Nobody’s Son",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "nobodysson|74KM79TiuVKeVCqs8QtB0B|182576",
  song: "song/sabrina-carpenter-nobodys-son",
} as const satisfies Track
