import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2EyesOpenTaylorSVersion = {
  id: "01a0676a-d71d-705a-ae46-bbf012843cb2",
  type: "page-type/release",
  slug: "taylor-swift-2-eyes-open-taylor-s-version",
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
      externalId: "6AeF9IkXFpHz5H3wUNX3L3",
      externalLink: "https://open.spotify.com/album/6AeF9IkXFpHz5H3wUNX3L3",
    },
  ],
  title: "Eyes Open (Taylor's Version)",
} as const satisfies Release
