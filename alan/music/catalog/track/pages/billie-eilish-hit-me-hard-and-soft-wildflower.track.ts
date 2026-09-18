import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftWildflower = {
  id: "01a0b638-e2bf-75d5-9849-f6246307491b",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-wildflower",
  ownLength: 4.357766666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3QaPy1KgI7nu9FJEQUgn6h",
      externalLink: "https://open.spotify.com/track/3QaPy1KgI7nu9FJEQUgn6h",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "WILDFLOWER",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "wildflower|6qqNVTkY8uBg9cP3Jd7DAH|261466",
} as const satisfies Track
