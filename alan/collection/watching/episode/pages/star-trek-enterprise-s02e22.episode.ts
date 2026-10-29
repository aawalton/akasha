import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e22 = {
  id: "01a18852-d431-78a1-b6be-e81a579e7f91",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e22",
  description:
    "The Enterprise crew makes first contact with the Vissians, a species with three genders. Trip meets one of the species' third gender, known as Cogenitor, and learns how badly Vissians treat all Cogenitors. Trip attempts to help the Cogenitor, even though it interferes with Vissian culture.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 22,
  publishedAt: "2003-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15583",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/22",
    },
  ],
  title: "Cogenitor",
  episodeType: "standard",
  stillPath: "/5Kl7snmPukxM4YHgVXJdgZsbNyl.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
