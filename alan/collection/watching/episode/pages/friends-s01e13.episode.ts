import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const friendsS01e13 = {
  id: "01a18848-c2b9-7559-9017-e4838b575a16",
  type: "page-type/episode",
  slug: "friends-s01e13",
  description:
    "Chandler accidentally sees Rachel wandering around topless after her shower, so Rachel tries to even the score. And no one can stand Phoebe's new boyfriend, an irritating guy named Roger.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/friends-season-1"],
  position: 13,
  publishedAt: "1995-01-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "86077",
      externalLink: "https://www.themoviedb.org/tv/1668/season/1/episode/13",
    },
  ],
  title: "The One with the Boobies",
  episodeType: "standard",
  stillPath: "/vLXgzuaAJ4bS4DBx4PdbXJhZgmf.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:30:32.248Z",
  updatedAt: "2026-10-29T15:30:32.248Z",
} as const satisfies Episode
