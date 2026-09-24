import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoILoveYou = {
  id: "01a0b638-e7e2-7496-b855-a5b74c6681d3",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-i-love-you",
  ownLength: 4.863266666666667,
  ownProgress: 4.863266666666667,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  status: "completed",
  unit: "unit/minutes",
  title: "i love you",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "iloveyou|6qqNVTkY8uBg9cP3Jd7DAH|291796",
  song: "song/billie-eilish-i-love-you",
  carriedBy: [
    {
      release: "release/billie-eilish-when-we-all-fall-asleep-where-do-we-go",
      discNumber: 1,
      position: 13,
      externalId: "6CcJMwBtXByIz4zQLzFkKc",
      externalLink: "https://open.spotify.com/track/6CcJMwBtXByIz4zQLzFkKc",
    },
  ],
} as const satisfies Track
