import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e05 = {
  id: "01a1884b-ef6c-7589-84cc-6d6bf824555c",
  type: "page-type/episode",
  slug: "ncis-s08e05",
  description:
    "The team uncovers a sinister plan when a controversial DJ and a Naval officer are shot to death.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 5,
  publishedAt: "2010-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334571",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/5",
    },
  ],
  title: "Dead Air",
  episodeType: "standard",
  stillPath: "/d9mxhK4lRbv17sQ2e6fHQiBYFs.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
