import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooAmortageYourLove = {
  id: "01a0afa2-7335-766d-972e-dd2f177f4d40",
  type: "page-type/track",
  slug: "jisoo-amortage-your-love",
  ownLength: 2.8872,
  ownProgress: 2.8872,
  partOfCollections: ["release/jisoo-amortage"],
  status: "completed",
  unit: "unit/minutes",
  title: "Your Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jisoo" }],
  trackKey: "yourlove|6UZ0ba50XreR4TM8u322gs|173232",
  song: "song/jisoo-your-love",
  carriedBy: [
    {
      release: "release/jisoo-amortage",
      discNumber: 1,
      position: 2,
      externalId: "6TPpCbn9z0IY5Te048iy5R",
      externalLink: "https://open.spotify.com/track/6TPpCbn9z0IY5Te048iy5R",
    },
  ],
} as const satisfies Track
