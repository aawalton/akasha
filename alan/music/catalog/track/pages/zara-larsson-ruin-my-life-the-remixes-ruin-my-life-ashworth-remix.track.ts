import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonRuinMyLifeTheRemixesRuinMyLifeAshworthRemix = {
  id: "01a0aa7c-3f55-72b1-89c5-943cd6e125ee",
  type: "page-type/track",
  slug: "zara-larsson-ruin-my-life-the-remixes-ruin-my-life-ashworth-remix",
  ownLength: 3.1851333333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-ruin-my-life-the-remixes"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "67FJh0BKKl5Gwas1TQWaF3",
      externalLink: "https://open.spotify.com/track/67FJh0BKKl5Gwas1TQWaF3",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ruin My Life - Ashworth Remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "3pcGjcfEW3YD2Hfk6tDR5S", artistName: "Ashworth" },
  ],
  trackKey: "ruinmylifeashworthremix|1Xylc3o4UrD53lo9CvFvVg,3pcGjcfEW3YD2Hfk6tDR5S|191108",
  song: "song/zara-larsson-ruin-my-life",
} as const satisfies Track
