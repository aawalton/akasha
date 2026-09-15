import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3MainTitleFromJurassicPark = {
  id: "01a0676a-d724-702b-845e-b8c6c71965cd",
  type: "release",
  slug: "the-piano-guys-3-main-title-from-jurassic-park",
  title: 'Main Title (From "Jurassic Park")',
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 3.931133,
  ownProgress: 3.931133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-06-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0DeZzjVFrU1WjC29FJ5KKN",
      externalLink: "https://open.spotify.com/album/0DeZzjVFrU1WjC29FJ5KKN",
    },
  ],
} as const satisfies Release
