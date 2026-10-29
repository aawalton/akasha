import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e05 = {
  id: "01a18853-ac8a-7147-a833-7d574e57bb10",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e05",
  description:
    "Stardate: 49011. Harry Kim arises one morning to find he is back in San Francisco on Earth with his girlfriend Libby. In order to help him restore reality, he enlists the help of a shady figure in France by the name of Tom Paris, who has no idea who Harry is.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 5,
  publishedAt: "1995-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "112971",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/5",
    },
  ],
  title: "Non Sequitur",
  episodeType: "standard",
  stillPath: "/7mU18XAw5EiFYQRJXt8yBocVVKu.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
