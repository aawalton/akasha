import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMidnightKygoRemix = {
  id: "01a0676a-d724-705e-b9b4-68209bbd87af",
  type: "page-type/release",
  slug: "coldplay-midnight-kygo-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2014-06-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7tI4UrXr27WbduHuVJlCp5",
      externalLink: "https://open.spotify.com/album/7tI4UrXr27WbduHuVJlCp5",
    },
  ],
  title: "Midnight (Kygo Remix)",
} as const satisfies Release
