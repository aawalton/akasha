import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const whiteCollarS03e15 = {
  id: "01a18881-51a1-750b-b7a8-45acf7f3a88e",
  type: "page-type/episode",
  slug: "white-collar-s03e15",
  description:
    "Neal joins the crew of a wealthy Yankees fan, tasked with stealing memorabilia from Yankee Stadium.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/white-collar-season-3"],
  position: 15,
  publishedAt: "2012-02-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "596290",
      externalLink: "https://www.themoviedb.org/tv/21510/season/3/episode/15",
    },
  ],
  title: "Stealing Home",
  episodeType: "standard",
  stillPath: "/AtOm1qFtspFPqPoG2SH8lp75EZA.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:32:18.847Z",
  updatedAt: "2026-10-29T16:32:18.847Z",
} as const satisfies Episode
