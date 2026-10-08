import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryEmpowered = {
  id: "01a0676a-d71d-700c-b96b-ce850132c6d6",
  type: "page-type/release",
  slug: "katy-perry-empowered",
  title: "Empowered",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 20.350617,
  ownProgress: 20.350617,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-11-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3YiQ8eGpgEaOJDdNf6eVFs",
      externalLink: "https://open.spotify.com/album/3YiQ8eGpgEaOJDdNf6eVFs",
    },
  ],
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
