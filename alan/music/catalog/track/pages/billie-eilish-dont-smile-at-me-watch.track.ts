import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeWatch = {
  id: "01a0b638-ebbd-731c-9d4d-b46887a9c756",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-watch",
  ownLength: 2.9587166666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7eB1V5LvAdxCc7brfGhRRo",
      externalLink: "https://open.spotify.com/track/7eB1V5LvAdxCc7brfGhRRo",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "watch",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "watch|6qqNVTkY8uBg9cP3Jd7DAH|177523",
} as const satisfies Track
