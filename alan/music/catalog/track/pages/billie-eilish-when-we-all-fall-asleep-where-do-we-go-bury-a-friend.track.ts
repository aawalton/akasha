import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoBuryAFriend = {
  id: "01a0b638-e76a-76bf-9689-68dc3346f805",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-bury-a-friend",
  ownLength: 3.21905,
  ownProgress: 3.21905,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  status: "completed",
  unit: "unit/minutes",
  title: "bury a friend",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "buryafriend|6qqNVTkY8uBg9cP3Jd7DAH|193143",
  song: "song/billie-eilish-bury-a-friend",
  carriedBy: [
    {
      release: "release/billie-eilish-when-we-all-fall-asleep-where-do-we-go",
      discNumber: 1,
      position: 10,
      externalId: "4SSnFejRGlZikf02HLewEF",
      externalLink: "https://open.spotify.com/track/4SSnFejRGlZikf02HLewEF",
    },
  ],
} as const satisfies Track
