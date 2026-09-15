import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiLateToTheParty = {
  id: "01a0676a-d722-705f-8786-cdb9e10427e6",
  type: "release",
  slug: "emei-late-to-the-party",
  title: "Late to the Party",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 2.952933,
  ownProgress: 2.952933,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2022-01-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1g9Kxqn7NNZyHB2dGtlbmR",
      externalLink: "https://open.spotify.com/album/1g9Kxqn7NNZyHB2dGtlbmR",
    },
  ],
} as const satisfies Release
