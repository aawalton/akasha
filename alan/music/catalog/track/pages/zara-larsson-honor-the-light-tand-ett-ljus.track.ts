import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightTandEttLjus = {
  id: "01a0aa7c-3926-724d-b5c0-867865364f38",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-tand-ett-ljus",
  ownLength: 3.1744333333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kdYhWxuJXPFKJgxrk1Q7v",
      externalLink: "https://open.spotify.com/track/1kdYhWxuJXPFKJgxrk1Q7v",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Tänd Ett Ljus",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "tandettljus|1Xylc3o4UrD53lo9CvFvVg|190466",
  song: "song/zara-larsson-tand-ett-ljus",
} as const satisfies Track
