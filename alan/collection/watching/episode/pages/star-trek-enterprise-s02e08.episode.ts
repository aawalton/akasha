import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e08 = {
  id: "01a18852-d431-7c59-ad49-889861c036e6",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e08",
  description:
    "Archer and Reed return to a pre-warp society, that is on the verge of war, to recover a lost communicator from an undercover survey mission.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 8,
  publishedAt: "2002-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15586",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/8",
    },
  ],
  title: "The Communicator",
  episodeType: "standard",
  stillPath: "/3vsY4DjmiOR3DCab4PUZ6jaulZk.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
