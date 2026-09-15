import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMidnightKygoRemix = {
  id: "01a0676a-d724-705e-b9b4-68209bbd87af",
  type: "release",
  slug: "coldplay-midnight-kygo-remix",
  title: "Midnight (Kygo Remix)",
  partOfCollections: ["artist/coldplay"],
  position: 0,
  ownLength: 5.27245,
  ownProgress: 5.27245,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-06-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7tI4UrXr27WbduHuVJlCp5",
      externalLink: "https://open.spotify.com/album/7tI4UrXr27WbduHuVJlCp5",
    },
  ],
} as const satisfies Release
