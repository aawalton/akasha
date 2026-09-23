import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2ThisLoveTaylorSVersion = {
  id: "01a0676a-d72e-7032-8255-ad6121ffe4bc",
  type: "page-type/release",
  slug: "taylor-swift-2-this-love-taylor-s-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2022-05-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3In1CblWZswwun5MhOa10y",
      externalLink: "https://open.spotify.com/album/3In1CblWZswwun5MhOa10y",
    },
  ],
  title: "This Love (Taylor’s Version)",
} as const satisfies Release
