import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const psychoPassS01e01 = {
  id: "01a183da-9e6f-76d6-bdc2-93f23f214224",
  type: "page-type/episode",
  slug: "psycho-pass-s01e01",
  description:
    "In a world where minds can be analysed for potential threats of crime and mental instability, Inspector Tsunemori Akane is sent to deal with her first case, along with fellow inspector Ginoza and a group of Enforcers, latent criminals hired by the police to work for them. Akane’s case deals with an insane man who has taken a woman hostage and raped her, holing himself up in a building inhabited by groups of the homeless.",
  ownLength: 28,
  ownProgress: 0,
  partOfCollections: ["season/psycho-pass-season-1"],
  position: 1,
  publishedAt: "2012-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "890499",
      externalLink: "https://www.themoviedb.org/tv/43865/season/1/episode/1",
    },
  ],
  title: "Crime Coefficient",
  episodeType: "standard",
  stillPath: "/3cj6XWLVUIhhyEVNacbQdJuqQ7.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-28T18:51:45.135Z",
  updatedAt: "2026-10-28T18:51:45.135Z",
} as const satisfies Episode
