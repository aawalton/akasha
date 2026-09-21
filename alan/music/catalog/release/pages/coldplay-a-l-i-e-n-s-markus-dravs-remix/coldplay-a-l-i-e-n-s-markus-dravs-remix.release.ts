import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayALIENSMarkusDravsRemix = {
  id: "01a0676a-d715-702a-8136-b9ba0786876e",
  type: "page-type/release",
  slug: "coldplay-a-l-i-e-n-s-markus-dravs-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2017-07-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3pg2wMCqJzTksen01JRptU",
      externalLink: "https://open.spotify.com/album/3pg2wMCqJzTksen01JRptU",
    },
  ],
  title: "A L I E N S (Markus Dravs Remix)",
} as const satisfies Release
