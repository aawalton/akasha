import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDiscoveryS02e02 = {
  id: "01a18852-a9f6-7166-9b6d-0b1e4816b3fc",
  type: "page-type/episode",
  slug: "star-trek-discovery-s02e02",
  description:
    "A new signal appears, prompting Stamets' emotional return to the mycelial network and leading Burnham, Pike and Owosekun to a pre-warp planet, where they face a complex ethical dilemma. Tilly's overeagerness lands her in trouble but when the planet - and Discovery's landing party - are threatened, her curiosity may be the one thing that can save them.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-discovery-season-2"],
  position: 2,
  publishedAt: "2019-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1682133",
      externalLink: "https://www.themoviedb.org/tv/67198/season/2/episode/2",
    },
  ],
  title: "New Eden",
  episodeType: "standard",
  stillPath: "/h9ZYhEnqvJSwuv6cKIxVSR2gN1o.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:41:21.268Z",
  updatedAt: "2026-10-29T15:41:21.268Z",
} as const satisfies Episode
