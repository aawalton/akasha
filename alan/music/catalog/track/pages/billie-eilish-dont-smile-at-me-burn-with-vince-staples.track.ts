import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishDontSmileAtMeBurnWithVinceStaples = {
  id: "01a0b638-ec80-7561-a2c5-e6f52974c2f8",
  type: "page-type/track",
  slug: "billie-eilish-dont-smile-at-me-burn-with-vince-staples",
  ownLength: 2.9835833333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-dont-smile-at-me"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6X7qcg95CAeJpTjtg1wooM",
      externalLink: "https://open.spotify.com/track/6X7qcg95CAeJpTjtg1wooM",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "&burn (with Vince Staples)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "68kEuyFKyqrdQQLLsmiatm", artistName: "Vince Staples" },
  ],
  trackKey: "burnwithvincestaples|68kEuyFKyqrdQQLLsmiatm,6qqNVTkY8uBg9cP3Jd7DAH|179015",
  song: "song/billie-eilish-burn",
} as const satisfies Track
