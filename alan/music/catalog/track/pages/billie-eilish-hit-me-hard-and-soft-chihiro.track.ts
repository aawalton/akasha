import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftChihiro = {
  id: "01a0b638-e275-7e84-a80b-20c3dd8319cd",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-chihiro",
  ownLength: 5.057333333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7BRD7x5pt8Lqa1eGYC4dzj",
      externalLink: "https://open.spotify.com/track/7BRD7x5pt8Lqa1eGYC4dzj",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "CHIHIRO",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "chihiro|6qqNVTkY8uBg9cP3Jd7DAH|303440",
  song: "song/billie-eilish-chihiro",
} as const satisfies Track
