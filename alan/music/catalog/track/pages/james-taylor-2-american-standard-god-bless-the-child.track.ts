import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardGodBlessTheChild = {
  id: "01a0abeb-2f11-7028-8a82-6bf75d0b305c",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-god-bless-the-child",
  ownLength: 3.3626666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "16eQQlzeHu2jVnopa59P2B",
      externalLink: "https://open.spotify.com/track/16eQQlzeHu2jVnopa59P2B",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "God Bless The Child",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "godblessthechild|0vn7UBvSQECKJm2817Yf1P|201760",
  song: "song/james-taylor-god-bless-the-child",
} as const satisfies Track
