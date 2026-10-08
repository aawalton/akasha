import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSupernatural = {
  id: "01a0676a-d72a-7049-9895-fbb43ad704e1",
  type: "page-type/release",
  slug: "ariana-grande-supernatural",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2025-09-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4FuGDyTBy2UQFdkpfJgGK3",
      externalLink: "https://open.spotify.com/album/4FuGDyTBy2UQFdkpfJgGK3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "supernatural",
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
