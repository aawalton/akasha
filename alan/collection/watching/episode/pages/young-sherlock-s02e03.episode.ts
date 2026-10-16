import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSherlockS02e03 = {
  id: "01a1447e-0758-7577-a4de-c679604bcc22",
  type: "page-type/episode",
  slug: "young-sherlock-s02e03",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/young-sherlock-season-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7610791",
      externalLink: "https://www.themoviedb.org/tv/255661/season/2/episode/3",
    },
  ],
  title: "Episode 3",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Episode
