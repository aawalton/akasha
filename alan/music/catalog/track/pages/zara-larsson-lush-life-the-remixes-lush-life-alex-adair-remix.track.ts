import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonLushLifeTheRemixesLushLifeAlexAdairRemix = {
  id: "01a0aa7c-2795-7780-9425-3cc738f1b44b",
  type: "page-type/track",
  slug: "zara-larsson-lush-life-the-remixes-lush-life-alex-adair-remix",
  ownLength: 3.57485,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-lush-life-the-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7JN46TALgEcGMhA83mWupQ",
      externalLink: "https://open.spotify.com/track/7JN46TALgEcGMhA83mWupQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Lush Life - Alex Adair Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "1mrrvBvbrm28iYaPlJ9mG5", artistName: "Alex Adair" },
  ],
  trackKey: "lushlifealexadairremix|1Xylc3o4UrD53lo9CvFvVg,1mrrvBvbrm28iYaPlJ9mG5|214491",
  song: "song/zara-larsson-lush-life",
} as const satisfies Track
