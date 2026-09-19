import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkOnlyForMe = {
  id: "01a0abeb-43f3-7cce-bc49-bc2d7c3df320",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-only-for-me",
  ownLength: 4.91,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1TMZGTMNupwBrtltZErGlX",
      externalLink: "https://open.spotify.com/track/1TMZGTMNupwBrtltZErGlX",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Only for Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "onlyforme|0vn7UBvSQECKJm2817Yf1P|294600",
  song: "song/james-taylor-only-for-me",
} as const satisfies Track
