import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelBillyJoelNarratives = {
  id: "01a0676a-d719-7005-ae69-7aafe740aced",
  type: "page-type/release",
  slug: "billy-joel-billy-joel-narratives",
  title: "Billy Joel - Narratives",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 27.54695,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-05-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "07qi6reLVlq9waILj1opdH",
      externalLink: "https://open.spotify.com/album/07qi6reLVlq9waILj1opdH",
    },
  ],
} as const satisfies Release
