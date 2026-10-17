import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaOnlyTimeRemix = {
  id: "01a0676a-d726-703b-b49e-b6f822518d26",
  type: "page-type/release",
  slug: "enya-only-time-remix",
  title: "Only Time (Remix)",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
