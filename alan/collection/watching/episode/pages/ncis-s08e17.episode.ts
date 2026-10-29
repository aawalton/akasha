import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e17 = {
  id: "01a1884b-ef6d-70cb-aab7-508eef0bbe56",
  type: "page-type/episode",
  slug: "ncis-s08e17",
  description:
    "NCIS discovers that one of its former investigative assistants found brutally stabbed to death was selling details for how to rob a warehouse full of valuable possessions belonging to a woman convicted of fraud.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 17,
  publishedAt: "2011-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334583",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/17",
    },
  ],
  title: "One Last Score",
  episodeType: "standard",
  stillPath: "/34ayfHyjbjuoronPJHtJqmznq7d.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
