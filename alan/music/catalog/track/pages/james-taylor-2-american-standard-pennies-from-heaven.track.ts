import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardPenniesFromHeaven = {
  id: "01a0abeb-2f32-7c84-8ac3-f6900d451504",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-pennies-from-heaven",
  ownLength: 2.8706666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2n7ObUjqWJ1k8GVhpHSbxM",
      externalLink: "https://open.spotify.com/track/2n7ObUjqWJ1k8GVhpHSbxM",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Pennies From Heaven",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "penniesfromheaven|0vn7UBvSQECKJm2817Yf1P|172240",
  song: "song/james-taylor-pennies-from-heaven",
} as const satisfies Track
