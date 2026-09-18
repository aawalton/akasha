import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftBirdsOfAFeather = {
  id: "01a0b638-e298-7d78-b4cf-27adb4c9722e",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-birds-of-a-feather",
  ownLength: 3.5062166666666665,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6dOtVTDdiauQNBQEDOtlAB",
      externalLink: "https://open.spotify.com/track/6dOtVTDdiauQNBQEDOtlAB",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "BIRDS OF A FEATHER",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "birdsofafeather|6qqNVTkY8uBg9cP3Jd7DAH|210373",
} as const satisfies Track
