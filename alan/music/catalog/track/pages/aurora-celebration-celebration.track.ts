import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraCelebrationCelebration = {
  id: "01a1690d-e326-763b-8aa4-06d056807839",
  type: "page-type/track",
  slug: "aurora-celebration-celebration",
  ownLength: 4.3591,
  ownProgress: 0,
  partOfCollections: ["release/aurora-celebration", "release/aurora-celebration-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Celebration",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "TOMORA" },
    { artist: "artist/aurora" },
    { artistName: "Tom Rowlands" },
  ],
  trackKey:
    "celebration|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|261546",
  song: "song/aurora-celebration",
  carriedBy: [
    {
      release: "release/aurora-celebration",
      discNumber: 1,
      position: 1,
      externalId: "06wz2wE8GJd0mSgzrN9Wud",
      externalLink: "https://open.spotify.com/track/06wz2wE8GJd0mSgzrN9Wud",
    },
    {
      release: "release/aurora-celebration-2",
      discNumber: 1,
      position: 1,
      externalId: "0mVE7ho0GazVMHVyt6cFz5",
      externalLink: "https://open.spotify.com/track/0mVE7ho0GazVMHVyt6cFz5",
    },
  ],
  createdAt: "2026-10-23T13:58:00.227Z",
  updatedAt: "2026-10-23T13:58:00.227Z",
} as const satisfies Track
