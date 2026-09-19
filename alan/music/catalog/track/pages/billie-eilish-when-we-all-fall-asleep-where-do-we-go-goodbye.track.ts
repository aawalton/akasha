import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoGoodbye = {
  id: "01a0b638-e80b-7a4f-8313-21b5e5a0bded",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-goodbye",
  ownLength: 1.99015,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3LgWsmilsrWXiPYQFRD0T7",
      externalLink: "https://open.spotify.com/track/3LgWsmilsrWXiPYQFRD0T7",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "goodbye",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "goodbye|6qqNVTkY8uBg9cP3Jd7DAH|119409",
  song: "song/billie-eilish-goodbye",
} as const satisfies Track
