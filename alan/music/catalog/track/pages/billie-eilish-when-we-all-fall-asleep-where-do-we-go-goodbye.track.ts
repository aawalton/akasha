import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoGoodbye = {
  id: "01a0b638-e80b-7a4f-8313-21b5e5a0bded",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-goodbye",
  ownLength: 1.99015,
  ownProgress: 1.99015,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  status: "completed",
  unit: "unit/minutes",
  title: "goodbye",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "goodbye|6qqNVTkY8uBg9cP3Jd7DAH|119409",
  song: "song/billie-eilish-goodbye",
  carriedBy: [
    {
      release: "release/billie-eilish-when-we-all-fall-asleep-where-do-we-go",
      discNumber: 1,
      position: 14,
      externalId: "3LgWsmilsrWXiPYQFRD0T7",
      externalLink: "https://open.spotify.com/track/3LgWsmilsrWXiPYQFRD0T7",
    },
  ],
} as const satisfies Track
