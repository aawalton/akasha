import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3AFamilyChristmas = {
  id: "01a0676a-d715-7025-9134-20f02dc6ec2f",
  type: "page-type/release",
  slug: "the-piano-guys-3-a-family-christmas",
  title: "A Family Christmas",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 46.494183,
  ownProgress: 46.494183,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-10-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1NrV9Ijb8Dk4yWv5LdYT09",
      externalLink: "https://open.spotify.com/album/1NrV9Ijb8Dk4yWv5LdYT09",
    },
  ],
} as const satisfies Release
