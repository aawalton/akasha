import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiTalesOfTheLesbianHunter = {
  id: "01a0676a-d72b-701d-94e3-82ac185332b1",
  type: "page-type/release",
  slug: "vinny-marchi-tales-of-the-lesbian-hunter",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2025-01-31",
  rank: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0fc4rBhCXlx4VkaIEsmbjg",
      externalLink: "https://open.spotify.com/album/0fc4rBhCXlx4VkaIEsmbjg",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "Tales of the Lesbian Hunter",
} as const satisfies Release
