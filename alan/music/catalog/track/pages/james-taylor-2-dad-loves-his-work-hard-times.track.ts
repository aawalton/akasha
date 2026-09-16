import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkHardTimes = {
  id: "01a0abeb-4332-7c14-b479-35e06e387c75",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-hard-times",
  ownLength: 3.1904333333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6jMNpRglqktDICL8HGfOBG",
      externalLink: "https://open.spotify.com/track/6jMNpRglqktDICL8HGfOBG",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Hard Times",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "hardtimes|0vn7UBvSQECKJm2817Yf1P|191426",
} as const satisfies Track
