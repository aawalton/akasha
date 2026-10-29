import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e07 = {
  id: "01a1885a-252a-7a85-a150-4605e1e546d4",
  type: "page-type/episode",
  slug: "young-sheldon-s01e07",
  description:
    "The kids brainstorm ways to resolve a family feud when Connie refuses to give George Sr. her brisket recipe.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 7,
  publishedAt: "2017-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1402820",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/7",
    },
  ],
  title: "A Brisket, Voodoo, and Cannonball Run",
  episodeType: "standard",
  stillPath: "/cZ9RfJyQWUvU9fbx2uw9Ie7T2OM.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
