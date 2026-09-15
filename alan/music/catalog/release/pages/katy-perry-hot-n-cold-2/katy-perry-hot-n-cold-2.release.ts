import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryHotNCold2 = {
  id: "01a0676a-d720-7062-84ee-8fddc7425360",
  type: "page-type/release",
  slug: "katy-perry-hot-n-cold-2",
  title: "Hot N Cold",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 12.272433,
  ownProgress: 12.272433,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-09-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HR0CUur5ucPjpyOYdNJY1",
      externalLink: "https://open.spotify.com/album/4HR0CUur5ucPjpyOYdNJY1",
    },
  ],
} as const satisfies Release
