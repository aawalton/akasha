import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e16 = {
  id: "01a1884b-ef67-7a51-b4ba-b08836283fc1",
  type: "page-type/episode",
  slug: "ncis-s04e16",
  description:
    "When a Navy Lieutenant becomes the victim of radiation poisoning, the NCIS team must find the person who's behind the crime. The Lieutenant, who is working for the International Atomic Energy Agency, claims that only his two colleagues knew about his assignment, and whoever it was, the person tried to stop the Lieutenant's next investigation.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 16,
  publishedAt: "2007-02-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334484",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/16",
    },
  ],
  title: "Dead Man Walking",
  episodeType: "standard",
  stillPath: "/bouFP6wyZ9QUvzPq5ahnfZepR5W.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
