import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiLateToTheParty = {
  id: "01a0676a-d722-705f-8786-cdb9e10427e6",
  type: "page-type/release",
  slug: "emei-late-to-the-party",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2022-01-19",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1g9Kxqn7NNZyHB2dGtlbmR",
      externalLink: "https://open.spotify.com/album/1g9Kxqn7NNZyHB2dGtlbmR",
    },
  ],
  title: "Late to the Party",
} as const satisfies Release
