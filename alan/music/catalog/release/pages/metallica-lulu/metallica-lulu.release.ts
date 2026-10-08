import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaLulu = {
  id: "01a0676a-d724-7015-aae4-99c6d89c4ec4",
  type: "page-type/release",
  slug: "metallica-lulu",
  title: "Lulu",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 87.129267,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-11-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3FgLMfp5o2h2rAny7S6h57",
      externalLink: "https://open.spotify.com/album/3FgLMfp5o2h2rAny7S6h57",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-15T16:38:20.000Z",
} as const satisfies Release
