import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e19 = {
  id: "01a1884b-ef75-7035-a1f9-fee0bdd0f275",
  type: "page-type/episode",
  slug: "ncis-s14e19",
  description: "The team must rely on an irritable Vietnam War veteran to solve a Marine's murder.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 19,
  publishedAt: "2017-03-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1281151",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/19",
    },
  ],
  title: "The Wall",
  episodeType: "standard",
  stillPath: "/aLR8LPI09gVLMiEncH8WZ4oZMxW.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
