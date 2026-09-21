import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeSantaCanTYouHearMeLive = {
  id: "01a0676a-d728-703d-a072-dd8c603e6718",
  type: "page-type/release",
  slug: "ariana-grande-santa-can-t-you-hear-me-live",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2022-12-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4xKjjV0sVc9PiJ1sPU9RiN",
      externalLink: "https://open.spotify.com/album/4xKjjV0sVc9PiJ1sPU9RiN",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Santa, Can’t You Hear Me (Live)",
} as const satisfies Release
