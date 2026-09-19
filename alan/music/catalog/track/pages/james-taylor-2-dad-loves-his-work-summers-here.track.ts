import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkSummersHere = {
  id: "01a0abeb-440f-71f9-8e52-295b165e0121",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-summers-here",
  ownLength: 2.71555,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kgoMTV6BJlCYzTR9lOxCy",
      externalLink: "https://open.spotify.com/track/1kgoMTV6BJlCYzTR9lOxCy",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Summer's Here",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "summershere|0vn7UBvSQECKJm2817Yf1P|162933",
  song: "song/james-taylor-summers-here",
} as const satisfies Track
