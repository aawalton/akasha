import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarHomewardBound = {
  id: "01a0b4c8-189f-7fe4-b434-e5c4d8ff0663",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-homeward-bound",
  ownLength: 3.75,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5vvqLOzysbbeAWgVoTHZwl",
      externalLink: "https://open.spotify.com/track/5vvqLOzysbbeAWgVoTHZwl",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Homeward Bound",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "homewardbound|7FQRbf8gbKw8KZQZAJWxH2|225000",
} as const satisfies Track
