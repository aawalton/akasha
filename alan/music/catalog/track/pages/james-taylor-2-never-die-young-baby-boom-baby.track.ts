import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungBabyBoomBaby = {
  id: "01a0abeb-40d4-7064-9d10-829823d5cf9c",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-baby-boom-baby",
  ownLength: 4.9971,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4yl5qTyPSN3277wwzAA9Aq",
      externalLink: "https://open.spotify.com/track/4yl5qTyPSN3277wwzAA9Aq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Baby Boom Baby",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "babyboombaby|0vn7UBvSQECKJm2817Yf1P|299826",
} as const satisfies Track
