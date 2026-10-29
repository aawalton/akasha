import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e04 = {
  id: "01a18852-d42f-79ac-9312-12290f61c125",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e04",
  description:
    "Archer sends an away team to a habitable, luscious planet for observation. But when a storm occurs, the team begins to experience paranoid delusions.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 4,
  publishedAt: "2001-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15540",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/4",
    },
  ],
  title: "Strange New World",
  episodeType: "standard",
  stillPath: "/6ZmzB11hahFiihVs9fuVj0SI86b.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
