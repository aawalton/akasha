import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishBellyacheMarianHillRemix = {
  id: "01a0676a-d718-703d-99c7-520cef044074",
  type: "page-type/release",
  slug: "billie-eilish-bellyache-marian-hill-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2017-05-05",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2I9wpUTuzMT8aS6iVpM2EQ",
      externalLink: "https://open.spotify.com/album/2I9wpUTuzMT8aS6iVpM2EQ",
    },
  ],
  title: "Bellyache (Marian Hill Remix)",
} as const satisfies Release
