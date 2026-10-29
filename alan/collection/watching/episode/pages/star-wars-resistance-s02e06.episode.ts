import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS02e06 = {
  id: "01a18853-f9b0-71e9-9b55-8c2d92851230",
  type: "page-type/episode",
  slug: "star-wars-resistance-s02e06",
  description:
    "Flix takes Kaz and crew to his home world to acquire fuel from his family's refinery, only to discover the family's drilling has awoken something monstrous.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-2"],
  position: 6,
  publishedAt: "2019-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1968331",
      externalLink: "https://www.themoviedb.org/tv/79093/season/2/episode/6",
    },
  ],
  title: "From Beneath",
  episodeType: "standard",
  stillPath: "/yQU1NWTt7oAJ8QnPLIP00DrWRcq.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
