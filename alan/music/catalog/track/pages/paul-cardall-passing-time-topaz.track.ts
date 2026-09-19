import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimeTopaz = {
  id: "01a0b4c8-6be8-76e6-8d69-55d2a5cbf5a1",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-topaz",
  ownLength: 2.7041,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-passing-time"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2lqMU0UTaAt3Q0P4tucF1n",
      externalLink: "https://open.spotify.com/track/2lqMU0UTaAt3Q0P4tucF1n",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Topaz",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "topaz|7FQRbf8gbKw8KZQZAJWxH2|162246",
  song: "song/paul-cardall-topaz",
} as const satisfies Track
