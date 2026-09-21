import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2LiveAtTheTroubadour = {
  id: "01a0676a-d723-7048-a21f-e512425a0d51",
  type: "page-type/release",
  slug: "james-taylor-2-live-at-the-troubadour",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2010-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0sCulNLnuzZW4TGugGi6Gv",
      externalLink: "https://open.spotify.com/album/0sCulNLnuzZW4TGugGi6Gv",
    },
  ],
  title: "Live At The Troubadour",
} as const satisfies Release
