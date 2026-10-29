import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS07e22 = {
  id: "01a1884b-ef6c-7518-8387-1bb76342d10d",
  type: "page-type/episode",
  slug: "ncis-s07e22",
  description:
    "The team tries to track down a serial killer, while Abby heads south of the border to give a speech with McGee in tow.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-7"],
  position: 22,
  publishedAt: "2010-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334560",
      externalLink: "https://www.themoviedb.org/tv/4614/season/7/episode/22",
    },
  ],
  title: "Borderland",
  episodeType: "standard",
  stillPath: "/b48DJjmAXk9cCtfWY0hBY71dgeH.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
