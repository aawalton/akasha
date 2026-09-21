import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayWePray = {
  id: "01a0676a-d730-7035-861e-e090c546a4d5",
  type: "page-type/release",
  slug: "coldplay-we-pray",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2024-08-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3dZE98f3OlxeQlm9qWYekK",
      externalLink: "https://open.spotify.com/album/3dZE98f3OlxeQlm9qWYekK",
    },
  ],
  title: "WE PRAY",
} as const satisfies Release
