import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e22 = {
  id: "01a1887f-e18b-7d64-b66d-6ccc0f215852",
  type: "page-type/episode",
  slug: "star-trek-2-s03e22",
  description:
    'Aliens force Captain Kirk and First Officer Spock to join forces with "Abraham Lincoln" and "Surak" to battle villains in a contest of good vs. evil.',
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 22,
  publishedAt: "1969-03-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14026",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/22",
    },
  ],
  title: "The Savage Curtain",
  episodeType: "standard",
  stillPath: "/bop6lpJuK2JngqBqVQtCkQnaBbD.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
