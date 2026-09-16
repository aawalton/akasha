import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagIWillNotLieForYou = {
  id: "01a0abeb-44cf-762c-8605-95583c612745",
  type: "page-type/track",
  slug: "james-taylor-2-flag-i-will-not-lie-for-you",
  ownLength: 3.2466666666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-flag"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6SWenTaB4PNj8DCY8TY8Nu",
      externalLink: "https://open.spotify.com/track/6SWenTaB4PNj8DCY8TY8Nu",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Will Not Lie for You",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "iwillnotlieforyou|0vn7UBvSQECKJm2817Yf1P|194800",
} as const satisfies Track
