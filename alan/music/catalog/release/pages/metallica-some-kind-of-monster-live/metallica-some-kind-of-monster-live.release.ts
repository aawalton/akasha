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
} as const satisfies Release
