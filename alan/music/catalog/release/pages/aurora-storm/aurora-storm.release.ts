import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraStorm = {
  id: "01a0676a-d72a-7023-be13-d5c3ea6db52e",
  type: "page-type/release",
  slug: "aurora-storm",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2022-06-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5jV393Pygg0HSUH3DRv8fL",
      externalLink: "https://open.spotify.com/album/5jV393Pygg0HSUH3DRv8fL",
    },
  ],
  title: "Storm",
} as const satisfies Release
