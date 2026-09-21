import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonRuinMyLifeTheRemixesRuinMyLifeFutoseRemix = {
  id: "01a0aa7c-3f75-776d-9836-8fbd57f157be",
  type: "page-type/track",
  slug: "zara-larsson-ruin-my-life-the-remixes-ruin-my-life-futose-remix",
  ownLength: 4.748166666666667,
  ownProgress: 4.748166666666667,
  partOfCollections: ["release/zara-larsson-ruin-my-life-the-remixes"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64eknQZcDCUqCagbPeOZF9",
      externalLink: "https://open.spotify.com/track/64eknQZcDCUqCagbPeOZF9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ruin My Life - Futosé Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "6FeeyXqknRHo5IhqaqKe4L", artistName: "Futosé" },
  ],
  trackKey: "ruinmylifefutoseremix|1Xylc3o4UrD53lo9CvFvVg,6FeeyXqknRHo5IhqaqKe4L|284890",
  song: "song/zara-larsson-ruin-my-life",
  carriedBy: [
    {
      release: "release/zara-larsson-ruin-my-life-the-remixes",
      discNumber: 1,
      position: 3,
      externalId: "64eknQZcDCUqCagbPeOZF9",
      externalLink: "https://open.spotify.com/track/64eknQZcDCUqCagbPeOZF9",
    },
  ],
} as const satisfies Track
