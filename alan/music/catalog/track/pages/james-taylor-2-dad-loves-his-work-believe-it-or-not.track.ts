import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2DadLovesHisWorkBelieveItOrNot = {
  id: "01a0abeb-43bb-7f10-a94f-0356c00338bb",
  type: "page-type/track",
  slug: "james-taylor-2-dad-loves-his-work-believe-it-or-not",
  ownLength: 3.82155,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-dad-loves-his-work"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6FYohC3fFYUqcsVZ2w7YeP",
      externalLink: "https://open.spotify.com/track/6FYohC3fFYUqcsVZ2w7YeP",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Believe It or Not",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "believeitornot|0vn7UBvSQECKJm2817Yf1P|229293",
  song: "song/james-taylor-believe-it-or-not",
} as const satisfies Track
