import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishWhenWeAllFallAsleepWhereDoWeGoBuryAFriend = {
  id: "01a0b638-e76a-76bf-9689-68dc3346f805",
  type: "page-type/track",
  slug: "billie-eilish-when-we-all-fall-asleep-where-do-we-go-bury-a-friend",
  ownLength: 3.21905,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-when-we-all-fall-asleep-where-do-we-go"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4SSnFejRGlZikf02HLewEF",
      externalLink: "https://open.spotify.com/track/4SSnFejRGlZikf02HLewEF",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "bury a friend",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "buryafriend|6qqNVTkY8uBg9cP3Jd7DAH|193143",
  song: "song/billie-eilish-bury-a-friend",
} as const satisfies Track
