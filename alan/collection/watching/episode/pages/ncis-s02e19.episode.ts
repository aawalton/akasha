import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e19 = {
  id: "01a1884b-ef64-7f0f-9e33-cd5ebe415622",
  type: "page-type/episode",
  slug: "ncis-s02e19",
  description:
    "The team investigate a suicide case, believing that the main reason of her death is a nervous breakdown, but Ducky believes that she was actually murdered. FBI Special Agent Fornell helps them in the investigation. The team discover that the dead woman was involved in a love triangle and that this may have contributed to her death.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 19,
  publishedAt: "2005-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334514",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/19",
    },
  ],
  title: "Conspiracy Theory",
  episodeType: "standard",
  stillPath: "/h65f50UXgdNgVVB66qvveqMztJq.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
