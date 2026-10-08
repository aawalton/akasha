import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMyUniverseGalantisRemix = {
  id: "01a0676a-d725-703a-970e-b591f48bcbd3",
  type: "page-type/release",
  slug: "coldplay-my-universe-galantis-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-10-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7eMHMiz2uvtDDMbvKRJxlP",
      externalLink: "https://open.spotify.com/album/7eMHMiz2uvtDDMbvKRJxlP",
    },
  ],
  title: "My Universe (Galantis Remix)",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
