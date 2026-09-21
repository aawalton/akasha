import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3SomethingJustLikeThisHungarianRhapsody = {
  id: "01a0676a-d729-705c-9651-796c9f685e28",
  type: "page-type/release",
  slug: "the-piano-guys-3-something-just-like-this-hungarian-rhapsody",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2018-01-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1F1IX4M5peq9lduLhUriXu",
      externalLink: "https://open.spotify.com/album/1F1IX4M5peq9lduLhUriXu",
    },
  ],
  title: "Something Just Like This / Hungarian Rhapsody",
} as const satisfies Release
