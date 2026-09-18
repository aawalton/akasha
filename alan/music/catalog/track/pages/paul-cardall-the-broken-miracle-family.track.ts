import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleFamily = {
  id: "01a0b4c8-2f16-7c23-a5af-e3d937787a5d",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-family",
  ownLength: 2.2637666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1S6aYw1vn3LV0jpoBpjnXv",
      externalLink: "https://open.spotify.com/track/1S6aYw1vn3LV0jpoBpjnXv",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Family",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "family|7FQRbf8gbKw8KZQZAJWxH2|135826",
} as const satisfies Track
