import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsWrecked = {
  id: "01a0676a-d731-703e-9f4d-48f97dc45d7d",
  type: "page-type/release",
  slug: "imagine-dragons-wrecked",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2021-07-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2qjb5OwlllLLOmrueU08kG",
      externalLink: "https://open.spotify.com/album/2qjb5OwlllLLOmrueU08kG",
    },
  ],
  title: "Wrecked",
  createdAt: "2026-09-03T13:17:30.289Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
