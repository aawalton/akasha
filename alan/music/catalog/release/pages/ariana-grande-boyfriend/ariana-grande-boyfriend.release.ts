import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeBoyfriend = {
  id: "01a0676a-d719-7029-b483-af6a33527d07",
  type: "page-type/release",
  slug: "ariana-grande-boyfriend",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2019-08-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3zVB99XMdbP9HTVNg0GJwV",
      externalLink: "https://open.spotify.com/album/3zVB99XMdbP9HTVNg0GJwV",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "boyfriend",
} as const satisfies Release
