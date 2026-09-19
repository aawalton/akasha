import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftLunch = {
  id: "01a0b638-e24c-7be1-aac3-880f51acff61",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-lunch",
  ownLength: 2.9931,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "629DixmZGHc7ILtEntuiWE",
      externalLink: "https://open.spotify.com/track/629DixmZGHc7ILtEntuiWE",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "LUNCH",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "lunch|6qqNVTkY8uBg9cP3Jd7DAH|179586",
  song: "song/billie-eilish-lunch",
} as const satisfies Track
