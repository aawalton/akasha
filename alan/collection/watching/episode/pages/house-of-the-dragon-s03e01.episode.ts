import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const houseOfTheDragonS03e01 = {
  id: "01a18849-a937-7210-912e-44d985559fdc",
  type: "page-type/episode",
  slug: "house-of-the-dragon-s03e01",
  description:
    "Driven by her faith in Alicent, Rhaenyra positions herself to take King's Landing while the Triarchy sails to take on Corlys in the Gullet.",
  ownLength: 66,
  ownProgress: 0,
  partOfCollections: ["season/house-of-the-dragon-season-3"],
  position: 1,
  publishedAt: "2026-06-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7196563",
      externalLink: "https://www.themoviedb.org/tv/94997/season/3/episode/1",
    },
  ],
  title: "Salt and Sea, Fire and Blood",
  episodeType: "standard",
  stillPath: "/oVawK97dRbB7zeMaC44SjXQgUr1.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:31:31.254Z",
  updatedAt: "2026-10-29T15:31:31.254Z",
} as const satisfies Episode
