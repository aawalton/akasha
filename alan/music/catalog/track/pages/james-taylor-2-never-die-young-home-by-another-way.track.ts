import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungHomeByAnotherWay = {
  id: "01a0abeb-416f-7488-b450-bbcb7e14ef89",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-home-by-another-way",
  ownLength: 3.8466666666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1FcDdDUOtMyoljOkxNuYOr",
      externalLink: "https://open.spotify.com/track/1FcDdDUOtMyoljOkxNuYOr",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Home by Another Way",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "homebyanotherway|0vn7UBvSQECKJm2817Yf1P|230800",
  song: "song/james-taylor-home-by-another-way",
} as const satisfies Track
