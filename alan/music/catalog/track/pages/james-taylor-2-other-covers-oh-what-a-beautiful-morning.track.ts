import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OtherCoversOhWhatABeautifulMorning = {
  id: "01a0abeb-32de-747a-b61f-48b6276ccbe8",
  type: "page-type/track",
  slug: "james-taylor-2-other-covers-oh-what-a-beautiful-morning",
  ownLength: 3.1797666666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-other-covers"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Yh3EzhORIQsrVtsE6dCIo",
      externalLink: "https://open.spotify.com/track/1Yh3EzhORIQsrVtsE6dCIo",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Oh, What a Beautiful Morning",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "ohwhatabeautifulmorning|0vn7UBvSQECKJm2817Yf1P|190786",
  song: "song/james-taylor-oh-what-a-beautiful-morning",
} as const satisfies Track
