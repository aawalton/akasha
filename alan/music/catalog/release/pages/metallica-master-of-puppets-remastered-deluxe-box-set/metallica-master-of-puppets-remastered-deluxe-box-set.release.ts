import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaMasterOfPuppetsRemasteredDeluxeBoxSet = {
  id: "01a0676a-d724-703b-b6ce-50e52ab00b1c",
  type: "page-type/release",
  slug: "metallica-master-of-puppets-remastered-deluxe-box-set",
  title: "Master of Puppets (Remastered Deluxe Box Set)",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 687.810933,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1986-03-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7CGhx630DIjdJqaBDVKc5j",
      externalLink: "https://open.spotify.com/album/7CGhx630DIjdJqaBDVKc5j",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-15T16:38:20.000Z",
} as const satisfies Release
