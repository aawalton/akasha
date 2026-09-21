import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayCharlieBrown = {
  id: "01a0676a-d71a-701a-b033-47472563d965",
  type: "page-type/release",
  slug: "coldplay-charlie-brown",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2012-04-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6UYr6OSxWSWkE2JLTo5SnD",
      externalLink: "https://open.spotify.com/album/6UYr6OSxWSWkE2JLTo5SnD",
    },
  ],
  title: "Charlie Brown",
} as const satisfies Release
