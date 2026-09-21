import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2NeverDieYoung = {
  id: "01a0676a-d725-7046-b833-b1edb4fe19b5",
  type: "page-type/release",
  slug: "james-taylor-2-never-die-young",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "1988-09-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1j6fH6Wu4ROhcOYAYpjiUt",
      externalLink: "https://open.spotify.com/album/1j6fH6Wu4ROhcOYAYpjiUt",
    },
  ],
  title: "Never Die Young",
} as const satisfies Release
