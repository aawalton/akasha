import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveFireAndRain = {
  id: "01a0abeb-3d09-7d59-b7e8-1de71e89d4c9",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-fire-and-rain",
  ownLength: 4.554433333333333,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1viOJBA51fN3goL3mJuSg8",
      externalLink: "https://open.spotify.com/track/1viOJBA51fN3goL3mJuSg8",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Fire and Rain",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "fireandrain|0vn7UBvSQECKJm2817Yf1P|273266",
  song: "song/james-taylor-fire-and-rain",
} as const satisfies Track
