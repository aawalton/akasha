import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3SomethingJustLikeThisHungarianRhapsody = {
  id: "01a0676a-d729-705c-9651-796c9f685e28",
  type: "page-type/release",
  slug: "the-piano-guys-3-something-just-like-this-hungarian-rhapsody",
  title: "Something Just Like This / Hungarian Rhapsody",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 3.89735,
  ownProgress: 3.89735,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-01-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1F1IX4M5peq9lduLhUriXu",
      externalLink: "https://open.spotify.com/album/1F1IX4M5peq9lduLhUriXu",
    },
  ],
} as const satisfies Release
