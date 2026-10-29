import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e18 = {
  id: "01a1884b-ef68-762a-9b70-54111a44f07a",
  type: "page-type/episode",
  slug: "ncis-s05e18",
  description:
    "When a former NCIS agent is found dead, the entire team is put in danger as they hunt after the killer.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 18,
  publishedAt: "2008-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334470",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/18",
    },
  ],
  title: "Judgment Day (1)",
  episodeType: "standard",
  stillPath: "/o16JeMg9APffLA7i8VDJenLPHNs.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
