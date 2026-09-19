import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonRuinMyLifeTheRemixesRuinMyLifePianoVersion = {
  id: "01a0aa7c-3f94-7e9f-8e3b-77f23b18d492",
  type: "page-type/track",
  slug: "zara-larsson-ruin-my-life-the-remixes-ruin-my-life-piano-version",
  ownLength: 3.168,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-ruin-my-life-the-remixes"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3DoXO1HcvDxCeucUCGDpUy",
      externalLink: "https://open.spotify.com/track/3DoXO1HcvDxCeucUCGDpUy",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ruin My Life - Piano Version",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "ruinmylifepianoversion|1Xylc3o4UrD53lo9CvFvVg|190080",
  song: "song/zara-larsson-ruin-my-life",
} as const satisfies Track
