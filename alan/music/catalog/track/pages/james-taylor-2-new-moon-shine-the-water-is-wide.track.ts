import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineTheWaterIsWide = {
  id: "01a0abeb-4076-7985-a5b2-68e052d9b930",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-the-water-is-wide",
  ownLength: 3.013333333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NaQl05UuL6ZHw6ptdyhdE",
      externalLink: "https://open.spotify.com/track/6NaQl05UuL6ZHw6ptdyhdE",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "The Water Is Wide",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "thewateriswide|0vn7UBvSQECKJm2817Yf1P|180800",
  song: "song/james-taylor-the-water-is-wide",
} as const satisfies Track
