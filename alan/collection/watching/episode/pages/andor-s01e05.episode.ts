import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e05 = {
  id: "01a18843-186f-7256-90aa-127d1c40069f",
  type: "page-type/episode",
  slug: "andor-s01e05",
  description:
    "Cassian must carefully navigate the distrust inherent in being the new member of a secret operation.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 5,
  publishedAt: "2022-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745385",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/5",
    },
  ],
  title: "The Axe Forgets",
  episodeType: "standard",
  stillPath: "/9XHSNgFHDybU94ql9NuHNgOqNYe.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
