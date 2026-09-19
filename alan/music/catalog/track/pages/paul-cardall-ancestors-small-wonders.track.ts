import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsSmallWonders = {
  id: "01a0b4c8-1f5e-7cbf-adf9-cdd0ff867b29",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-small-wonders",
  ownLength: 3.1630166666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7d6deS3xWOiAbLjJO1H2Rn",
      externalLink: "https://open.spotify.com/track/7d6deS3xWOiAbLjJO1H2Rn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Small Wonders",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "smallwonders|7FQRbf8gbKw8KZQZAJWxH2|189781",
  song: "song/paul-cardall-small-wonders",
} as const satisfies Track
