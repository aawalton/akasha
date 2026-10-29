import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e18 = {
  id: "01a18852-d430-7195-8766-2ee7c92bc9c4",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e18",
  description:
    "While exploring an uncharted planet, Enterprise crew members encounter a group of aliens who are hunting down indigenous creatures for recreation. During their exploration, Archer is mesmerized by visions of an elusive, yet familiar woman who needs his help.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 18,
  publishedAt: "2002-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15553",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/18",
    },
  ],
  title: "Rogue Planet",
  episodeType: "standard",
  stillPath: "/cihc4tni6IInLpbUCfZJgn53blO.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
