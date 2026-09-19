import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheLookingGlassTheLookingGlass = {
  id: "01a0b4c8-6175-796d-8937-02fb713902a1",
  type: "page-type/track",
  slug: "paul-cardall-the-looking-glass-the-looking-glass",
  ownLength: 3.768883333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-looking-glass"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "58ywJxoieqnvmCSvyMHlmB",
      externalLink: "https://open.spotify.com/track/58ywJxoieqnvmCSvyMHlmB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Looking Glass",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thelookingglass|7FQRbf8gbKw8KZQZAJWxH2|226133",
  song: "song/paul-cardall-the-looking-glass",
} as const satisfies Track
