import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS04e23 = {
  id: "01a1884b-ef67-7aea-a65f-1f1d66bc8b91",
  type: "page-type/episode",
  slug: "ncis-s04e23",
  description:
    "When Jenny has to attend an overseas conference, Gibbs is made acting director, but he prefers to ignore his duties and lead the investigation of the murder of a man, who was found dead in a taxi headed to the NCIS headquarters.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-4"],
  position: 23,
  publishedAt: "2007-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334494",
      externalLink: "https://www.themoviedb.org/tv/4614/season/4/episode/23",
    },
  ],
  title: "Trojan Horse",
  episodeType: "standard",
  stillPath: "/gTifhtpNkjO9JNeosqLFQBtJRfI.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
