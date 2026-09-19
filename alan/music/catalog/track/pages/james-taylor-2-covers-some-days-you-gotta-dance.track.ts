import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2CoversSomeDaysYouGottaDance = {
  id: "01a0abeb-342d-7de4-b5e0-e366feacfce9",
  type: "page-type/track",
  slug: "james-taylor-2-covers-some-days-you-gotta-dance",
  ownLength: 2.6568833333333335,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-covers"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7wsuB1hxiDdWBVC9D5NZXn",
      externalLink: "https://open.spotify.com/track/7wsuB1hxiDdWBVC9D5NZXn",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Some Days You Gotta Dance",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "somedaysyougottadance|0vn7UBvSQECKJm2817Yf1P|159413",
  song: "song/james-taylor-some-days-you-gotta-dance",
} as const satisfies Track
