import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const katyPerryNeverReallyOverSynColeRemix = {
  id: "01a0676a-d725-704d-9996-8db7282ec9da",
  type: "release",
  slug: "katy-perry-never-really-over-syn-cole-remix",
  title: "Never Really Over (Syn Cole Remix)",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.14285,
  ownProgress: 3.14285,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-07-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6eZLMbytOZ4xBNKLVqgXyR",
      externalLink: "https://open.spotify.com/album/6eZLMbytOZ4xBNKLVqgXyR",
    },
  ],
} as const satisfies Release
