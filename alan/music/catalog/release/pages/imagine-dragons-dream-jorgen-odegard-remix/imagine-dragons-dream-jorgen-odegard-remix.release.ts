import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsDreamJorgenOdegardRemix = {
  id: "01a0676a-d71c-7030-9502-390ae0824e20",
  type: "page-type/release",
  slug: "imagine-dragons-dream-jorgen-odegard-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2015-08-31",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2PnEgvcqgS54GSRgWBSiur",
      externalLink: "https://open.spotify.com/album/2PnEgvcqgS54GSRgWBSiur",
    },
  ],
  title: "Dream (Jorgen Odegard Remix)",
} as const satisfies Release
