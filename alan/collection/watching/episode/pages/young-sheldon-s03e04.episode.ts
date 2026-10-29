import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS03e04 = {
  id: "01a1885a-252c-79a6-bffc-edc0a13c5588",
  type: "page-type/episode",
  slug: "young-sheldon-s03e04",
  description:
    'Sheldon is forced to take a break from science when his new obsession with "The Lord of the Rings" leads to an unhealthy habit. Also, Missy asks George Sr. to teach her how to play catch.',
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-3"],
  position: 4,
  publishedAt: "2019-10-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1939840",
      externalLink: "https://www.themoviedb.org/tv/71728/season/3/episode/4",
    },
  ],
  title: "Hobbitses, Physicses and a Ball with Zip",
  episodeType: "standard",
  stillPath: "/8D4p69gNW2lEainBu7Egf1HlO7c.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
