import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const justinTimberlakeJustified = {
  id: "01a0676a-d722-7032-be3b-50c0280e0bc5",
  type: "page-type/release",
  slug: "justin-timberlake-justified",
  title: "Justified",
  partOfCollections: ["artist/justin-timberlake"],
  position: 0,
  ownLength: 63.352133,
  ownProgress: 63.352133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2002-11-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QPkyl04rXwTGlGlcYaRoW",
      externalLink: "https://open.spotify.com/album/6QPkyl04rXwTGlGlcYaRoW",
    },
  ],
  createdAt: "2026-09-03T13:17:30.274Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
