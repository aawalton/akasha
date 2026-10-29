import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e05 = {
  id: "01a1884b-ef7c-723e-b8c8-f4fecb77666f",
  type: "page-type/episode",
  slug: "ncis-s19e05",
  description:
    "The NCIS team investigates the death of a Navy officer whose body suddenly explodes before Jimmy can examine it.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 5,
  publishedAt: "2021-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248848",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/5",
    },
  ],
  title: "Face the Strange",
  episodeType: "standard",
  stillPath: "/iWM780infuavHASgUW0SvZk8ptt.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
