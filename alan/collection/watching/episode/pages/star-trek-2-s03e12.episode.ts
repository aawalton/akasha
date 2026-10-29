import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e12 = {
  id: "01a1887f-e18a-7644-ac7e-8205294d9217",
  type: "page-type/episode",
  slug: "star-trek-2-s03e12",
  description:
    "While visiting a doomed planet, the landing party is subject to torturous experiments by powerful aliens.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 12,
  publishedAt: "1968-12-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14020",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/12",
    },
  ],
  title: "The Empath",
  episodeType: "standard",
  stillPath: "/A3wRvT1AVKU3ag74CXPn8zkAH6l.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
