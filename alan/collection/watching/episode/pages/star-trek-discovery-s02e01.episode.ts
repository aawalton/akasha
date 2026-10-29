import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS02e01 = {
  id: "01a18852-a9f5-725b-8d5b-9cea44c6ff80",
  type: "page-type/episode",
  slug: "star-trek-discovery-s02e01",
  description:
    "After answering a distress signal from the U.S.S. Enterprise, the U.S.S. Discovery welcomes aboard Captain Christopher Pike and begins a new mission to investigate the meaning behind seven mysterious red signals. Michael Burnham grapples with her past growing up on Vulcan with her foster parents and brother Spock.",
  ownLength: 61,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-2"],
  position: 1,
  publishedAt: "2019-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1587496",
      externalLink: "https://www.themoviedb.org/tv/67198/season/2/episode/1",
    },
  ],
  title: "Brother",
  episodeType: "standard",
  stillPath: "/bNzSxkuTqbVp9WBOfk8JD50YGca.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
