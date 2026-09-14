import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const lindseyStirling2SnowWaltz = {
  id: "01a0676a-d729-703c-9c4f-eee9584ea788",
  type: "release",
  slug: "lindsey-stirling-2-snow-waltz",
  title: "Snow Waltz",
  partOfCollections: ["lindsey-stirling"],
  position: 0,
  ownLength: 45.095717,
  ownProgress: 45.095717,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-10-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1VggmVcQEgVtLmNYWCrdGI",
      externalLink: "https://open.spotify.com/album/1VggmVcQEgVtLmNYWCrdGI",
    },
  ],
} as const satisfies Release
