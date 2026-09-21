import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const mitskiLoveMeMoreClarkRemix = {
  id: "01a0676a-d723-7074-994d-de311f849da6",
  type: "page-type/release",
  slug: "mitski-love-me-more-clark-remix",
  title: "Love Me More (Clark Remix)",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 8.3959,
  ownProgress: 8.3959,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2022-01-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6HdcSKeFXBOTJ83958WnXE",
      externalLink: "https://open.spotify.com/album/6HdcSKeFXBOTJ83958WnXE",
    },
  ],
} as const satisfies Release
