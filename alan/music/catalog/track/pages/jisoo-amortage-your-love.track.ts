import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jisooAmortageYourLove = {
  id: "01a0afa2-7335-766d-972e-dd2f177f4d40",
  type: "page-type/track",
  slug: "jisoo-amortage-your-love",
  ownLength: 2.8872,
  ownProgress: 0,
  partOfCollections: ["release/jisoo-amortage"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6TPpCbn9z0IY5Te048iy5R",
      externalLink: "https://open.spotify.com/track/6TPpCbn9z0IY5Te048iy5R",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Your Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6UZ0ba50XreR4TM8u322gs", artistName: "JISOO" }],
  trackKey: "yourlove|6UZ0ba50XreR4TM8u322gs|173232",
  song: "song/jisoo-your-love",
} as const satisfies Track
