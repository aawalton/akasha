import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixWavingThroughAWindow = {
  id: "01a0676a-d730-7024-946e-fa2efa2ffa96",
  type: "release",
  slug: "pentatonix-waving-through-a-window",
  title: "Waving Through a Window",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.85185,
  ownProgress: 3.85185,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-05-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Lu19hxsgZSYrDFT7gGIK1",
      externalLink: "https://open.spotify.com/album/1Lu19hxsgZSYrDFT7gGIK1",
    },
  ],
} as const satisfies Release
