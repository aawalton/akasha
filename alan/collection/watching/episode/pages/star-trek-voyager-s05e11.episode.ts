import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e11 = {
  id: "01a18853-ac8f-719b-98fc-eaac6b6400c4",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e11",
  description:
    "Stardate: Unknown. A gap in The Doctor's memory uncovers clues to a mystery involving the nature of his existence.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 11,
  publishedAt: "1999-01-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113217",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/11",
    },
  ],
  title: "Latent Image",
  episodeType: "standard",
  stillPath: "/579wOrCWZYJ287klrgm0DFPqXX1.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
