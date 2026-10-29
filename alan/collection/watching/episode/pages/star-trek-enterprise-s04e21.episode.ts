import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS04e21 = {
  id: "01a18852-d434-7677-b26b-6639077be0b5",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s04e21",
  description:
    "A human isolationist leader threatens to destroy Starfleet Command unless all aliens leave Earth immediately.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-4"],
  position: 21,
  publishedAt: "2005-05-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15625",
      externalLink: "https://www.themoviedb.org/tv/314/season/4/episode/21",
    },
  ],
  title: "Terra Prime (2)",
  episodeType: "standard",
  stillPath: "/net4A6vOGfh1ps6Whd1JLTmSezz.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
