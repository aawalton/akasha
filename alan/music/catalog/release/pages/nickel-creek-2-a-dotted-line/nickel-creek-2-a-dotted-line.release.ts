import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2ADottedLine = {
  id: "01a0676a-d715-7023-bbe4-e4ed7fe17948",
  type: "page-type/release",
  slug: "nickel-creek-2-a-dotted-line",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2014-03-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ujidZyCiCruwocS0bDmt2",
      externalLink: "https://open.spotify.com/album/3ujidZyCiCruwocS0bDmt2",
    },
  ],
  title: "A Dotted Line",
} as const satisfies Release
