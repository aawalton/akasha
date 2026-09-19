import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoWishYouWereGay = {
  id: "01a0b638-e6c5-7a67-9c14-31bf27e5e8f4",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-wish-you-were-gay",
  ownLength: 3.6923833333333334,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Fj47GNK2kUF0uaEDgXLaD",
      externalLink: "https://open.spotify.com/track/3Fj47GNK2kUF0uaEDgXLaD",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "wish you were gay",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "wishyouweregay|6qqNVTkY8uBg9cP3Jd7DAH|221543",
  song: "song/billie-eilish-wish-you-were-gay",
} as const satisfies Track
