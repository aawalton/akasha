import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2OtherCoversInTheMidnightHour = {
  id: "01a0abeb-337a-75da-9ee7-3f96f41175ee",
  type: "page-type/track",
  slug: "james-taylor-2-other-covers-in-the-midnight-hour",
  ownLength: 3.236666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-other-covers"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0IqfR9NSTljo3wFjqHRpGy",
      externalLink: "https://open.spotify.com/track/0IqfR9NSTljo3wFjqHRpGy",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "In The Midnight Hour",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "inthemidnighthour|0vn7UBvSQECKJm2817Yf1P|194200",
  song: "song/james-taylor-in-the-midnight-hour",
} as const satisfies Track
