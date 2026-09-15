import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaOnlyTimeRemix = {
  id: "01a0676a-d726-703b-b49e-b6f822518d26",
  type: "release",
  slug: "enya-only-time-remix",
  title: "Only Time (Remix)",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 13.703967,
  ownProgress: 13.703967,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2001-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4UbEBIr5sQHjHTytKWqYqq",
      externalLink: "https://open.spotify.com/album/4UbEBIr5sQHjHTytKWqYqq",
    },
  ],
} as const satisfies Release
