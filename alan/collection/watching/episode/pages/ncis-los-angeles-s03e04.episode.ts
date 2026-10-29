import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e04 = {
  id: "01a1884a-e0ea-7187-8113-5467a2196434",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e04",
  description:
    "The NCIS team delves into the underground world of the Libyan resistance movement following the murder of a news reporter, and Hetty reveals details about Callen’s past.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 4,
  publishedAt: "2011-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557329",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/4",
    },
  ],
  title: "Deadline",
  episodeType: "standard",
  stillPath: "/lxFTqWRWHJJ22TjbwCPhAQDHt2T.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
