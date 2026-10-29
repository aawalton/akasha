import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e03 = {
  id: "01a1884b-ef74-7e9a-9055-a38528ca1cb0",
  type: "page-type/episode",
  slug: "ncis-s14e03",
  description:
    "When the NCIS team investigates a Marine Sergeant’s tragic fall from a building, her doctor confides in Gibbs and suggests he treat it as a murder investigation.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 3,
  publishedAt: "2016-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1224100",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/3",
    },
  ],
  title: "Privileged Information",
  episodeType: "standard",
  stillPath: "/1P5vGXq7ON0nJyzi1XsvOna9HIu.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
