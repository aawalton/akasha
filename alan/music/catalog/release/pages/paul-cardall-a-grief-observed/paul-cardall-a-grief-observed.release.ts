import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallAGriefObserved = {
  id: "01a0676a-d715-7026-811d-4c630326d435",
  type: "page-type/release",
  slug: "paul-cardall-a-grief-observed",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2024-01-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0QeqfRxjPmLfILhSA0Z4Go",
      externalLink: "https://open.spotify.com/album/0QeqfRxjPmLfILhSA0Z4Go",
    },
  ],
  title: "A Grief Observed",
} as const satisfies Release
