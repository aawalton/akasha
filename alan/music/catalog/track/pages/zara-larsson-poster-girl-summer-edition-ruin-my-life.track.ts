import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonPosterGirlSummerEditionRuinMyLife = {
  id: "01a0aa7c-2e52-7111-ae51-9d44daff61ba",
  type: "page-type/track",
  slug: "zara-larsson-poster-girl-summer-edition-ruin-my-life",
  ownLength: 3.1675166666666668,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-poster-girl-summer-edition"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1i53E1c5niobtiwDceo0XD",
      externalLink: "https://open.spotify.com/track/1i53E1c5niobtiwDceo0XD",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Ruin My Life",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "ruinmylife|1Xylc3o4UrD53lo9CvFvVg|190051",
  song: "song/zara-larsson-ruin-my-life",
} as const satisfies Track
