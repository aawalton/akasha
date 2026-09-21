import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsGoldJorgenOdegardRemix = {
  id: "01a0676a-d71f-7011-9907-866ab38701e4",
  type: "page-type/release",
  slug: "imagine-dragons-gold-jorgen-odegard-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2016-09-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7e35dImdCQp3UgP6xEMoFm",
      externalLink: "https://open.spotify.com/album/7e35dImdCQp3UgP6xEMoFm",
    },
  ],
  title: "Gold (Jorgen Odegard Remix)",
} as const satisfies Release
