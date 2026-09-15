import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaDeathMagnetic = {
  id: "01a0676a-d71b-7072-baa6-f66552257618",
  type: "release",
  slug: "metallica-death-magnetic",
  title: "Death Magnetic",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 74.750833,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2008-09-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lf5ceMub7KQhLfGxCdM06",
      externalLink: "https://open.spotify.com/album/0lf5ceMub7KQhLfGxCdM06",
    },
  ],
} as const satisfies Release
