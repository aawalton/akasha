import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const paulCardallASacredChristmasPianoCollection = {
  id: "01a0676a-d715-703e-b639-0d04f13d7b0d",
  type: "page-type/release",
  slug: "paul-cardall-a-sacred-christmas-piano-collection",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/paul-cardall"],
  position: 0,
  publishedAt: "2011-12-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XbQNxAmdzEli5HdjGSzcy",
      externalLink: "https://open.spotify.com/album/5XbQNxAmdzEli5HdjGSzcy",
    },
  ],
  title: "A Sacred Christmas | Piano Collection",
} as const satisfies Release
