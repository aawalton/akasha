import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const yaelokreHayfields = {
  id: "01a0676a-d720-7002-9e67-50b8fa6df917",
  type: "page-type/release",
  slug: "yaelokre-hayfields",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/yaelokre"],
  position: 0,
  publishedAt: "2024-03-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2fYTH1xMFrojPJVDRMor8y",
      externalLink: "https://open.spotify.com/album/2fYTH1xMFrojPJVDRMor8y",
    },
  ],
  title: "Hayfields",
} as const satisfies Release
