import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS06e05 = {
  id: "01a18854-50ad-7049-acbb-4ab0a17db6e8",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s06e05",
  description:
    "While on Scipio to fund a mercy mission, Padmé Amidala is called upon by an old friend, Rush Clovis, to help uncover corruption in the Banking Clan. They must evade the bounty hunter Embo to escape the planet with the incriminating information.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-6"],
  position: 5,
  publishedAt: "2014-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010386",
      externalLink: "https://www.themoviedb.org/tv/4194/season/6/episode/5",
    },
  ],
  title: "An Old Friend",
  episodeType: "standard",
  stillPath: "/xsfNc0p2CWhcZwqTjoOMIQ94gGA.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
