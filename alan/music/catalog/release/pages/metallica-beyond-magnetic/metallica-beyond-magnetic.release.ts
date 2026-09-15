import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const metallicaBeyondMagnetic = {
  id: "01a0676a-d718-7054-9c08-3eaf90c58955",
  type: "release",
  slug: "metallica-beyond-magnetic",
  title: "Beyond Magnetic",
  partOfCollections: ["artist/metallica"],
  position: 0,
  ownLength: 29.175983,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-12-13",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5WSYGRqZDvQphb2Ugig4jh",
      externalLink: "https://open.spotify.com/album/5WSYGRqZDvQphb2Ugig4jh",
    },
  ],
} as const satisfies Release
