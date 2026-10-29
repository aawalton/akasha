import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS01e01 = {
  id: "01a1887e-1e3c-77ea-af9d-185071207f1f",
  type: "page-type/episode",
  slug: "castle-s01e01",
  description:
    "Author Richard Castle joins NYC Detective Kate Beckett to help solve the case of a serial killer who is reenacting murders from Castle's novels; Castle becomes very intrigued with the murders and continues to shadow Beckett, much to her chagrin.",
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-1"],
  position: 1,
  publishedAt: "2009-03-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64807",
      externalLink: "https://www.themoviedb.org/tv/1419/season/1/episode/1",
    },
  ],
  title: "Flowers for Your Grave",
  episodeType: "standard",
  stillPath: "/7f54zhTZfww2fYDML8jXfRi6fZ7.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
