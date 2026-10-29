import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisOriginsS01e01 = {
  id: "01a1884b-5348-75fb-960c-949d41cd714c",
  type: "page-type/episode",
  slug: "ncis-origins-s01e01",
  description:
    "Gibbs starts his career as a newly minted special agent at the fledgling NCIS Camp Pendleton office, where he forges his place on a gritty ragtag team.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-origins-season-1"],
  position: 1,
  publishedAt: "2024-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5051906",
      externalLink: "https://www.themoviedb.org/tv/243006/season/1/episode/1",
    },
  ],
  title: "Enter Sandman (1)",
  episodeType: "standard",
  stillPath: "/sBN4q2WB6pGQqACV2EEomc99S2c.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:33:20.328Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Episode
