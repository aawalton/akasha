import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e19 = {
  id: "01a1884b-ef70-7cb4-bc17-0097536dfaa4",
  type: "page-type/episode",
  slug: "ncis-s10e19",
  description:
    "The team investigates death of a Navy medical officer aboard a ship that went through a storm.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 19,
  publishedAt: "2013-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334688",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/19",
    },
  ],
  title: "Squall",
  episodeType: "standard",
  stillPath: "/gp2p1U3IHzKomh6lrzG3XjVBn0m.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
