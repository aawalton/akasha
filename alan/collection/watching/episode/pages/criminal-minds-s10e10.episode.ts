import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS10e10 = {
  id: "01a18844-d7f3-7268-a4fd-5e4b0c010fa0",
  type: "page-type/episode",
  slug: "criminal-minds-s10e10",
  description:
    "When the BAU is called to Salt Lake City Utah to investigate a triple homicide, the search for a connection among the victims could lead them to a fugitive who could have ties to the UnSub.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-10"],
  position: 10,
  publishedAt: "2014-12-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1012766",
      externalLink: "https://www.themoviedb.org/tv/4057/season/10/episode/10",
    },
  ],
  title: "Amelia Porter",
  episodeType: "mid-season",
  stillPath: "/arkSlS91nnBKg1PlGl0vwOjdfQ1.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
