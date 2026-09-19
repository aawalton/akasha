import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterManSBestFriendGoodbye = {
  id: "01a0b111-1cce-7b23-b4f2-31135a04f73d",
  type: "page-type/track",
  slug: "sabrina-carpenter-man-s-best-friend-goodbye",
  ownLength: 3.7514,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-man-s-best-friend"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4tVVmShMF2PYdLqcejrsy2",
      externalLink: "https://open.spotify.com/track/4tVVmShMF2PYdLqcejrsy2",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Goodbye",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "goodbye|74KM79TiuVKeVCqs8QtB0B|225084",
  song: "song/sabrina-carpenter-goodbye",
} as const satisfies Track
