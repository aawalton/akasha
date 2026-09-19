import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonLushLifeTheRemixesLushLife = {
  id: "01a0aa7c-274d-70f4-aee6-d6d7e9a19019",
  type: "page-type/track",
  slug: "zara-larsson-lush-life-the-remixes-lush-life",
  ownLength: 3.3378,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-lush-life-the-remixes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hGjlrBjEibu1rqbXYfgY9",
      externalLink: "https://open.spotify.com/track/7hGjlrBjEibu1rqbXYfgY9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Lush Life",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "lushlife|1Xylc3o4UrD53lo9CvFvVg|200268",
  song: "song/zara-larsson-lush-life",
} as const satisfies Track
