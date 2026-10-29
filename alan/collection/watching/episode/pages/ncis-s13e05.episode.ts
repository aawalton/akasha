import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e05 = {
  id: "01a1884b-ef73-7148-8691-f769f86b26ca",
  type: "page-type/episode",
  slug: "ncis-s13e05",
  description:
    "While visiting a pharmaceutical lab on a murder case, Abby is trapped with no communication to the outside world after armed men take over the building and hold everyone hostage.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 5,
  publishedAt: "2015-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1131350",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/5",
    },
  ],
  title: "Lockdown",
  episodeType: "standard",
  stillPath: "/qo0PS1f4DpjgTVCF9873TIResbR.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
