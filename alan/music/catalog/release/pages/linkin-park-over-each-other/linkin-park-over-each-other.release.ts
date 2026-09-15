import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkOverEachOther = {
  id: "01a0676a-d726-7053-8ddb-3c0f74ac2849",
  type: "page-type/release",
  slug: "linkin-park-over-each-other",
  title: "Over Each Other",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 8.798067,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09mU09ThtQmKfCgtEeiQZP",
      externalLink: "https://open.spotify.com/album/09mU09ThtQmKfCgtEeiQZP",
    },
  ],
} as const satisfies Release
