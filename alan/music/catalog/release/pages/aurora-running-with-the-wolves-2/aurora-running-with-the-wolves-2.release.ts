import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRunningWithTheWolves2 = {
  id: "01a0676a-d728-7032-80bd-63624b7d183c",
  type: "page-type/release",
  slug: "aurora-running-with-the-wolves-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2015-04-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yr0vKlEB437XLgCBrbSsi",
      externalLink: "https://open.spotify.com/album/3yr0vKlEB437XLgCBrbSsi",
    },
  ],
  title: "Running with the Wolves",
} as const satisfies Release
