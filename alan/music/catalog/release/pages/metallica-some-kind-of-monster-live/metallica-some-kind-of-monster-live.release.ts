import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaSomeKindOfMonsterLive = {
  id: "01a0676a-d729-7050-b96d-1f86fb053fbe",
  type: "page-type/release",
  slug: "metallica-some-kind-of-monster-live",
  title: "Some Kind Of Monster (Live)",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 43.183517,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2004-07-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3A0FTyAAcjgfhPibPsuVSc",
      externalLink: "https://open.spotify.com/album/3A0FTyAAcjgfhPibPsuVSc",
    },
  ],
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-15T16:38:20.000Z",
} as const satisfies Release
