import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2Montana = {
  id: "01a0676a-d724-7081-83c1-b776c07c8510",
  type: "page-type/release",
  slug: "james-taylor-2-montana",
  title: "Montana",
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  ownLength: 3.425333,
  ownProgress: 3.425333,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-05-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4atB9O5pUmJUJ914dQWC4X",
      externalLink: "https://open.spotify.com/album/4atB9O5pUmJUJ914dQWC4X",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
