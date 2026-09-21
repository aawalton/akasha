import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraToBeAlrightTheSanctuaryRemix = {
  id: "01a0676a-d72f-7002-aa44-f7e876e67b6c",
  type: "page-type/release",
  slug: "aurora-to-be-alright-the-sanctuary-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2024-07-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15gg0PgEyWNffQPkTvVySx",
      externalLink: "https://open.spotify.com/album/15gg0PgEyWNffQPkTvVySx",
    },
  ],
  title: "To Be Alright (The Sanctuary Remix)",
} as const satisfies Release
