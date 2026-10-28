import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cowboyBebopS01e01 = {
  id: "01a183d6-d2be-7276-afc1-457adf094fa2",
  type: "page-type/episode",
  slug: "cowboy-bebop-s01e01",
  description:
    "Spike and Jet’s next case takes them to Mars, where they’ll to try apprehend a professional pet thief and a priceless data dog.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/cowboy-bebop-season-1"],
  position: 1,
  publishedAt: "1998-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750947",
      externalLink: "https://www.themoviedb.org/tv/30991/season/1/episode/1",
    },
  ],
  title: "Stray Dog Strut",
  episodeType: "standard",
  stillPath: "/iVrdlxroQAPcMzTQl9IoTJM55Dz.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:47:36.381Z",
  updatedAt: "2026-10-28T18:47:36.381Z",
} as const satisfies Episode
