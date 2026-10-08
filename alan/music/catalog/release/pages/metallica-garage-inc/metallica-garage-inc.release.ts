import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaGarageInc = {
  id: "01a0676a-d71e-704e-a4c6-b17be32b288f",
  type: "page-type/release",
  slug: "metallica-garage-inc",
  title: "Garage, Inc.",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 136.61875,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1998-11-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5b7HQ04lPT7eGJQ7fmVsjC",
      externalLink: "https://open.spotify.com/album/5b7HQ04lPT7eGJQ7fmVsjC",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
