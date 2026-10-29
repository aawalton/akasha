import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e10 = {
  id: "01a1887f-e188-7226-ba66-48e7dfa33999",
  type: "page-type/episode",
  slug: "star-trek-2-s02e10",
  description:
    "The Enterprise must transport dignitaries to a peace conference, with an assassin on the loose.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 10,
  publishedAt: "1967-11-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13986",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/10",
    },
  ],
  title: "Journey to Babel",
  episodeType: "standard",
  stillPath: "/x6C1EzvzLKa8DhURtUHF7HiDYqY.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
