import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoBadGuy = {
  id: "01a0b638-e628-7db7-8c87-5797f930e2cc",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-bad-guy",
  ownLength: 3.234783333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Fxmhks0bxGSBdJ92vM42m",
      externalLink: "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "bad guy",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "badguy|6qqNVTkY8uBg9cP3Jd7DAH|194087",
  song: "song/billie-eilish-bad-guy",
} as const satisfies Track
