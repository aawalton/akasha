import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoBadGuy = {
  id: "01a0b638-e628-7db7-8c87-5797f930e2cc",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-bad-guy",
  ownLength: 3.234783333333333,
  ownProgress: 3.234783333333333,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  status: "completed",
  unit: "unit/minutes",
  title: "bad guy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "badguy|6qqNVTkY8uBg9cP3Jd7DAH|194087",
  song: "song/billie-eilish-bad-guy",
  carriedBy: [
    {
      release: "release/billie-eilish-when-we-all-fall-asleep-where-do-we-go",
      discNumber: 1,
      position: 2,
      externalId: "2Fxmhks0bxGSBdJ92vM42m",
      externalLink: "https://open.spotify.com/track/2Fxmhks0bxGSBdJ92vM42m",
    },
  ],
} as const satisfies Track
