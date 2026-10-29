import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS01e11 = {
  id: "01a18852-196a-7933-a296-74f7243330cd",
  type: "page-type/episode",
  slug: "skeleton-crew-s01e11",
  description:
    "Veronica finds the answer to all her financial woes, while Eddie shares some unexpected moments with both Ethel and Cecelia. Gina and Evan and Hunter and Aaron find their relationships growing more complicated. Anthony faces harsh truths about himself and Carla.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-skeleton-crew-season-1"],
  position: 11,
  publishedAt: "2016-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380456",
      externalLink: "https://www.themoviedb.org/tv/225011/season/1/episode/11",
    },
  ],
  title: "Funny Bones",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
