import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerTheMiddle = {
  id: "01a0676a-d72d-7043-aa91-0c20d5cd1a0b",
  type: "page-type/release",
  slug: "jada-facer-the-middle",
  title: "The Middle",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.2978,
  ownProgress: 2.2978,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-09-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "53qSpqS1XF5kp3kOCZXfVD",
      externalLink: "https://open.spotify.com/album/53qSpqS1XF5kp3kOCZXfVD",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
