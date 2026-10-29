import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS01e08 = {
  id: "01a18852-d42f-7667-b084-39baea8de14c",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s01e08",
  description: "A Vulcan starship interferes with Archer's probe of an oversized comet.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-1"],
  position: 8,
  publishedAt: "2001-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15544",
      externalLink: "https://www.themoviedb.org/tv/314/season/1/episode/8",
    },
  ],
  title: "Breaking the Ice",
  episodeType: "standard",
  stillPath: "/dzaXurkuouyPjykmmrN3xZs3de0.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
