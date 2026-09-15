import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraRunningWithTheWolves2 = {
  id: "01a0676a-d728-7032-80bd-63624b7d183c",
  type: "page-type/release",
  slug: "aurora-running-with-the-wolves-2",
  title: "Running with the Wolves",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 3.246,
  ownProgress: 3.246,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-04-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3yr0vKlEB437XLgCBrbSsi",
      externalLink: "https://open.spotify.com/album/3yr0vKlEB437XLgCBrbSsi",
    },
  ],
} as const satisfies Release
