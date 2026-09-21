import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2Jt = {
  id: "01a0676a-d722-702c-8054-101c71933d00",
  type: "page-type/release",
  slug: "james-taylor-2-jt",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1977-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Pbc9Jq12a47mQ1z9yIuhn",
      externalLink: "https://open.spotify.com/album/0Pbc9Jq12a47mQ1z9yIuhn",
    },
  ],
  title: "JT",
} as const satisfies Release
