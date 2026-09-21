import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3AFamilyChristmas = {
  id: "01a0676a-d715-7025-9134-20f02dc6ec2f",
  type: "page-type/release",
  slug: "the-piano-guys-3-a-family-christmas",
  ownLength: 46.494183,
  ownProgress: 46.70121666666667,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2013-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1NrV9Ijb8Dk4yWv5LdYT09",
      externalLink: "https://open.spotify.com/album/1NrV9Ijb8Dk4yWv5LdYT09",
    },
  ],
  title: "A Family Christmas",
} as const satisfies Release
