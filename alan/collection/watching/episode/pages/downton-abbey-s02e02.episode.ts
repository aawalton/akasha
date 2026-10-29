import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const downtonAbbeyS02e02 = {
  id: "01a18847-e985-77cc-b8df-76fab6d5fcaf",
  type: "page-type/episode",
  slug: "downton-abbey-s02e02",
  description:
    "Carson is finding it tough maintaining standards in the house, and the suicide of a young officer prompts Isobel to suggest converting Downton Abbey into a convalescent hospital.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/downton-abbey-season-2"],
  position: 2,
  publishedAt: "2011-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779843",
      externalLink: "https://www.themoviedb.org/tv/33907/season/2/episode/2",
    },
  ],
  title: "Episode 2",
  episodeType: "standard",
  stillPath: "/XbsKwONRn6iU9ZxP3bgHnLjblL.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:29:36.644Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Episode
