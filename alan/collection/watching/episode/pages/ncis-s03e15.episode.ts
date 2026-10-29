import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS03e15 = {
  id: "01a1884b-ef65-72cd-a824-a144412ffcd4",
  type: "page-type/episode",
  slug: "ncis-s03e15",
  description:
    "While discovering an illegal automotive chop shop, the NCIS team stumble upon a severed head of a Marine, hidden in one of the cars from the shop. When they find possible suspects, the team will have to find the rest of the body and find the murderer.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-3"],
  position: 15,
  publishedAt: "2006-02-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334531",
      externalLink: "https://www.themoviedb.org/tv/4614/season/3/episode/15",
    },
  ],
  title: "Head Case",
  episodeType: "standard",
  stillPath: "/p1wtZkik3iWHGmwlPg0uJWcDe3.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
