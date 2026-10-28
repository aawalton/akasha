import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e128 = {
  id: "01a183d1-bb53-7de2-9ea9-028bbf834828",
  type: "page-type/episode",
  slug: "naruto-s03e128",
  description:
    "Finally catching up to Sasuke, Naruto does all he can to keep him from going to Orochimaru. Does he have enough strength to stop him or is Sasuke gone for good?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 128,
  publishedAt: "2005-03-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908105",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/128",
    },
  ],
  title: "A Cry on Deaf Ears",
  episodeType: "standard",
  stillPath: "/dY3C4b3AMo1SLwBOZ6WE1hvwauq.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
