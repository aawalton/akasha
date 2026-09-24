import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiCrazyStupidLoveCrazyStupidLove = {
  id: "01a0c43e-775b-7652-89fa-bc82c870e262",
  type: "page-type/track",
  slug: "emei-crazy-stupid-love-crazy-stupid-love",
  ownLength: 2.60555,
  ownProgress: 2.60555,
  partOfCollections: ["release/emei-crazy-stupid-love"],
  status: "completed",
  unit: "unit/minutes",
  title: "Crazy Stupid Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "crazystupidlove|7E2aQQjErJocovYFjYLzWU|156333",
  song: "song/emei-crazy-stupid-love",
  carriedBy: [
    {
      release: "release/emei-crazy-stupid-love",
      discNumber: 1,
      position: 1,
      externalId: "5ChgblPPPwyuGhga3msdns",
      externalLink: "https://open.spotify.com/track/5ChgblPPPwyuGhga3msdns",
    },
  ],
} as const satisfies Track
