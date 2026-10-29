import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e05 = {
  id: "01a1887f-e186-7084-b2b3-6f157b02cc2c",
  type: "page-type/episode",
  slug: "star-trek-2-s01e05",
  description:
    "Split by a transporter malfunction into two beings with very different personalities, the resulting twin Captain Kirk proves that neither a purely evil nor a sweetly good captain can survive without the missing half.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 5,
  publishedAt: "1966-10-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13962",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/5",
    },
  ],
  title: "The Enemy Within",
  episodeType: "standard",
  stillPath: "/pGiV9KYVjWozQI8GjAROoxoaaS5.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
