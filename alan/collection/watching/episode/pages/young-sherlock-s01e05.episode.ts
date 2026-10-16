import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSherlockS01e05 = {
  id: "01a1447e-0757-772a-9716-0dd37629cd13",
  type: "page-type/episode",
  slug: "young-sherlock-s01e05",
  description:
    "Years after a tragic accident that tore the Holmes family apart, Moriarty and Sherlock come to blows as they investigate that fateful day.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/young-sherlock-season-1"],
  position: 5,
  publishedAt: "2026-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5657756",
      externalLink: "https://www.themoviedb.org/tv/255661/season/1/episode/5",
    },
  ],
  title: "The Case of Young Sherlock Holmes",
  episodeType: "standard",
  stillPath: "/cHvko2L80gUGPZonq9b1tUq3cLZ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Episode
