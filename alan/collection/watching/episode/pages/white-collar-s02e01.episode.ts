import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS02e01 = {
  id: "01a18881-51a0-754a-93ad-0231eeaf39b3",
  type: "page-type/episode",
  slug: "white-collar-s02e01",
  description:
    "Peter and Neal try to stay a step ahead of a sophisticated bank robber. But once alarms are set off throughout the city, the guys realize they're dealing with a true professional.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/white-collar-season-2"],
  position: 1,
  publishedAt: "2010-07-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596259",
      externalLink: "https://www.themoviedb.org/tv/21510/season/2/episode/1",
    },
  ],
  title: "Withdrawal",
  episodeType: "standard",
  stillPath: "/1xYWDikqwvvSYFLZNaz3StMN38P.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
