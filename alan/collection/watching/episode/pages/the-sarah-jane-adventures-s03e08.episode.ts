import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS03e08 = {
  id: "01a18858-1d5d-7633-808e-25d99dfb5dd2",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s03e08",
  description:
    "Sarah Jane and the gang discover the secret of Erasmus Darkening - but are they too late?",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-3"],
  position: 8,
  publishedAt: "2009-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12012",
      externalLink: "https://www.themoviedb.org/tv/203/season/3/episode/8",
    },
  ],
  title: "The Eternity Trap (2)",
  episodeType: "standard",
  stillPath: "/eALN0tbwIy7GeAnVAgE68sstEfR.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
