import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS02e04 = {
  id: "01a18845-e1fa-770b-8c55-87635e785cd6",
  type: "page-type/episode",
  slug: "daredevil-s02e04",
  description: "Bullseye adopts a new morning routine. Fisk takes the ring.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-2"],
  position: 4,
  publishedAt: "2026-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6825660",
      externalLink: "https://www.themoviedb.org/tv/202555/season/2/episode/4",
    },
  ],
  title: "Gloves Off",
  episodeType: "standard",
  stillPath: "/2wG70Lehic8WukXmUEL9jjENNn6.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
