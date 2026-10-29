import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e02 = {
  id: "01a18853-ac92-7bd1-a9f4-2099726e2051",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e02",
  description:
    "Stardate: 54129.4 - A key Borg component in Seven's brain begins shutting down, leading to the possibility that she may be facing the equivalent of a terminal illness.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 2,
  publishedAt: "2000-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466819",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/2",
    },
  ],
  title: "Imperfection",
  episodeType: "standard",
  stillPath: "/lOybvR7kWicvWfj0BRmAHf1eZpr.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
