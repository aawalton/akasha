import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSherlockS01e06 = {
  id: "01a1447e-0757-7509-8f57-070fe5aae4af",
  type: "page-type/episode",
  slug: "young-sherlock-s01e06",
  description:
    "As Sherlock digs deeper into the Oxford murders, he discovers a shocking connection.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/young-sherlock-season-1"],
  position: 6,
  publishedAt: "2026-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5657757",
      externalLink: "https://www.themoviedb.org/tv/255661/season/1/episode/6",
    },
  ],
  title: "The Case of the Killing Jar",
  episodeType: "standard",
  stillPath: "/iPz06F8ZfEvmmQdnGYCnCGIwVPs.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Episode
