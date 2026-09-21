import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const theHoldernessFamilyBestOfThe90s = {
  id: "01a0676a-d718-7049-ad42-7ecf1b4c35ec",
  type: "page-type/release",
  slug: "the-holderness-family-best-of-the-90s",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-holderness-family"],
  position: 0,
  publishedAt: "2020-03-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TNCD6MbalOKHh7cGI5JTi",
      externalLink: "https://open.spotify.com/album/4TNCD6MbalOKHh7cGI5JTi",
      lastSyncedAt: "2025-11-27",
    },
  ],
  title: "Best of the 90s",
} as const satisfies Release
