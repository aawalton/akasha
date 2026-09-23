import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2RedTaylorSVersion = {
  id: "01a0676a-d727-705f-9a63-c90c8ea35350",
  type: "page-type/release",
  slug: "taylor-swift-2-red-taylor-s-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2021-11-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6kZ42qRrzov54LcAk4onW9",
      externalLink: "https://open.spotify.com/album/6kZ42qRrzov54LcAk4onW9",
    },
  ],
  title: "Red (Taylor's Version)",
} as const satisfies Release
