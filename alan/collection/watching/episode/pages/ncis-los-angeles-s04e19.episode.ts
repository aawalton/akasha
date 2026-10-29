import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS04e19 = {
  id: "01a1884a-e0ec-7ff7-998a-00b8314eb318",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s04e19",
  description:
    'While the LA team chases leads digitally and locally, the NCIS: Red team travels in their mobile trucks, nicknamed "Laverne and Shirley", in a race to track down a cunning terrorist before he disappears.',
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-4"],
  position: 19,
  publishedAt: "2013-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557370",
      externalLink: "https://www.themoviedb.org/tv/17610/season/4/episode/19",
    },
  ],
  title: "Red (2)",
  episodeType: "standard",
  stillPath: "/pqp9qO6GegZs2fyTXzS8w22iXIR.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
