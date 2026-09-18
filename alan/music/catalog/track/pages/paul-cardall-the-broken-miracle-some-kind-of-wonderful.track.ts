import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleSomeKindOfWonderful = {
  id: "01a0b4c8-305f-7dcb-98a3-ad7b9d09e518",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-some-kind-of-wonderful",
  ownLength: 3.8708833333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4YlxofC4t2BKQ0KeLsb879",
      externalLink: "https://open.spotify.com/track/4YlxofC4t2BKQ0KeLsb879",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Some Kind of Wonderful",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "1Fj0R2t4HaJa3oUe8azB8R", artistName: "Ty Herndon" },
  ],
  trackKey: "somekindofwonderful|1Fj0R2t4HaJa3oUe8azB8R,7FQRbf8gbKw8KZQZAJWxH2|232253",
} as const satisfies Track
