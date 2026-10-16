import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSherlockS02e01 = {
  id: "01a1447e-0758-75e9-8602-c76697e73a09",
  type: "page-type/episode",
  slug: "young-sherlock-s02e01",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/young-sherlock-season-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7610788",
      externalLink: "https://www.themoviedb.org/tv/255661/season/2/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-16T11:34:32.535Z",
  updatedAt: "2026-10-16T11:34:32.535Z",
} as const satisfies Episode
