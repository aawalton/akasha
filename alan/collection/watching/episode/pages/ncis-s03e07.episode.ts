import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e07 = {
  id: "01a1884b-ef65-709a-96e1-38506d14f150",
  type: "page-type/episode",
  slug: "ncis-s03e07",
  description:
    "When a six-year-old boy informs the NCIS team that his father was kidnapped, the team discover that the missing father is actually a Lt. Commander working on a secret project named Honor, and that he is the only one who has the code that can open the project.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 7,
  publishedAt: "2005-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334525",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/7",
    },
  ],
  title: "Honor Code",
  episodeType: "standard",
  stillPath: "/fFlwrCzXqwmhoW03RCoXZr6zxyX.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
