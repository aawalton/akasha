import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2FearlessTaylorSVersion = {
  id: "01a0676a-d71d-706c-b5f2-5cdc19d23870",
  type: "page-type/release",
  slug: "taylor-swift-2-fearless-taylor-s-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2021-04-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4hDok0OAJd57SGIT8xuWJH",
      externalLink: "https://open.spotify.com/album/4hDok0OAJd57SGIT8xuWJH",
    },
  ],
  title: "Fearless (Taylor's Version)",
} as const satisfies Release
