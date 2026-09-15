import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaSomeKindOfMonsterEp = {
  id: "01a0676a-d729-704f-887c-04d890063932",
  type: "page-type/release",
  slug: "metallica-some-kind-of-monster-ep",
  title: "Some Kind Of Monster EP",
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
      externalId: "7Gv5QjgYP04LqYSEJ0anJS",
      externalLink: "https://open.spotify.com/album/7Gv5QjgYP04LqYSEJ0anJS",
    },
  ],
} as const satisfies Release
