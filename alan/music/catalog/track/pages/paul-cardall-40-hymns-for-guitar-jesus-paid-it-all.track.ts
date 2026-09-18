import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarJesusPaidItAll = {
  id: "01a0b4c8-1b7b-7a17-9a90-db75cf2aace1",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-jesus-paid-it-all",
  ownLength: 2.8333333333333335,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 23,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1aBsv1kFKPLhZR8IfLRGoC",
      externalLink: "https://open.spotify.com/track/1aBsv1kFKPLhZR8IfLRGoC",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Jesus Paid It All",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "jesuspaiditall|7FQRbf8gbKw8KZQZAJWxH2|170000",
} as const satisfies Track
