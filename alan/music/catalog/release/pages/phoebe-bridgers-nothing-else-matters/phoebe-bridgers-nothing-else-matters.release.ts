import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersNothingElseMatters = {
  id: "01a0676a-d725-707d-b784-13fd24ab5832",
  type: "page-type/release",
  slug: "phoebe-bridgers-nothing-else-matters",
  title: "Nothing Else Matters",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 4.5751,
  ownProgress: 4.5751,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2021-08-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5cGlNs3L4C2mzMQiAfox41",
      externalLink: "https://open.spotify.com/album/5cGlNs3L4C2mzMQiAfox41",
    },
  ],
} as const satisfies Release
