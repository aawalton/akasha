import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiLyingHereAlone = {
  id: "01a0676a-d724-701f-857a-40a94308554e",
  type: "page-type/release",
  slug: "vinny-marchi-lying-here-alone",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2022-09-13",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1J5ZiED8VbC09rnvFHdU9Y",
      externalLink: "https://open.spotify.com/album/1J5ZiED8VbC09rnvFHdU9Y",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "LYING HERE ALONE",
} as const satisfies Release
