import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e16 = {
  id: "01a1884b-ef68-7642-ad4e-50017f4f6e32",
  type: "page-type/episode",
  slug: "ncis-s05e16",
  description:
    "While on an undercover mission, Ziva's life is put in grave danger when the serial killer she's been tracking becomes suspicious of her.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 16,
  publishedAt: "2008-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334468",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/16",
    },
  ],
  title: "Recoil",
  episodeType: "standard",
  stillPath: "/jdzKTlafyCBw5n0dg6GdqORnscf.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
