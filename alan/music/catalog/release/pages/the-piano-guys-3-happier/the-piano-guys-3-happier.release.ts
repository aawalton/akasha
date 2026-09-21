import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Happier = {
  id: "01a0676a-d71f-7046-9b04-50e3122c3b89",
  type: "page-type/release",
  slug: "the-piano-guys-3-happier",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2019-10-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6NiOhpKszc9qTjGIMCb56s",
      externalLink: "https://open.spotify.com/album/6NiOhpKszc9qTjGIMCb56s",
    },
  ],
  title: "Happier",
} as const satisfies Release
