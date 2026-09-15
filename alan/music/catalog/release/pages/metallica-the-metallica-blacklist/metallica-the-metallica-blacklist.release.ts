import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaTheMetallicaBlacklist = {
  id: "01a0676a-d72d-7042-b209-b1a4d65a0846",
  type: "release",
  slug: "metallica-the-metallica-blacklist",
  title: "The Metallica Blacklist",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 245.4364,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "73pUIoNvoi8m51Vg97CAKX",
      externalLink: "https://open.spotify.com/album/73pUIoNvoi8m51Vg97CAKX",
    },
  ],
} as const satisfies Release
