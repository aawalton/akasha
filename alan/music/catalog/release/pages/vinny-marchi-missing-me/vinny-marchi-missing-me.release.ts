import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const vinnyMarchiMissingMe = {
  id: "01a0676a-d724-7078-9a6a-373c98336664",
  type: "page-type/release",
  slug: "vinny-marchi-missing-me",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/vinny-marchi"],
  position: 0,
  publishedAt: "2021-11-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5yeONclCHVTkgawO1OlNiF",
      externalLink: "https://open.spotify.com/album/5yeONclCHVTkgawO1OlNiF",
      lastSyncedAt: "2025-10-24",
    },
  ],
  title: "missing me.",
} as const satisfies Release
