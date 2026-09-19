import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftSkinny = {
  id: "01a0b638-e222-7d47-99ac-abb2529e89ec",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-skinny",
  ownLength: 3.6622166666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1CsMKhwEmNnmvHUuO5nryA",
      externalLink: "https://open.spotify.com/track/1CsMKhwEmNnmvHUuO5nryA",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "SKINNY",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "skinny|6qqNVTkY8uBg9cP3Jd7DAH|219733",
  song: "song/billie-eilish-skinny",
} as const satisfies Track
