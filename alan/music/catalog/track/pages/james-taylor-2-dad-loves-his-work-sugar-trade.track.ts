import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkSugarTrade = {
  id: "01a0abeb-442a-7e59-b4e9-429776a6d8f3",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-sugar-trade",
  ownLength: 2.8077666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1uzu2Ll2NoqPOPzXMxlqJ5",
      externalLink: "https://open.spotify.com/track/1uzu2Ll2NoqPOPzXMxlqJ5",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sugar Trade",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "sugartrade|0vn7UBvSQECKJm2817Yf1P|168466",
  song: "song/james-taylor-sugar-trade",
} as const satisfies Track
