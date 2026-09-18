import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarInTheGarden = {
  id: "01a0b4c8-1d53-7cf1-8d24-0f93402439c2",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-in-the-garden",
  ownLength: 2.033333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 36,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DGKWGBw9KaOErws15lbKs",
      externalLink: "https://open.spotify.com/track/5DGKWGBw9KaOErws15lbKs",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "In The Garden",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "inthegarden|7FQRbf8gbKw8KZQZAJWxH2|122000",
} as const satisfies Track
