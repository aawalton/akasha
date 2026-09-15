import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jadaFacerLookWhatYouMadeMeDo = {
  id: "01a0676a-d723-7061-b042-137c47758c1c",
  type: "page-type/release",
  slug: "jada-facer-look-what-you-made-me-do",
  title: "Look What You Made Me Do",
  partOfCollections: ["artist/jada-facer"],
  position: 0,
  ownLength: 2.216,
  ownProgress: 2.216,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-09-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lNmDRQMciHkGz83DlTUH6",
      externalLink: "https://open.spotify.com/album/3lNmDRQMciHkGz83DlTUH6",
    },
  ],
} as const satisfies Release
