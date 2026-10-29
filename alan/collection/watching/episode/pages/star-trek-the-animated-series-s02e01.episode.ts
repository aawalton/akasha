import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheAnimatedSeriesS02e01 = {
  id: "01a1887f-fdf1-73cd-a55f-591e33410716",
  type: "page-type/episode",
  slug: "star-trek-the-animated-series-s02e01",
  description:
    "Stardate: 6334.1\n\nWith Spock stricken down by a fatal disease, the Enterprise must track down the drug that can cure him before it is too late.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/star-trek-the-animated-series-season-2"],
  position: 1,
  publishedAt: "1974-09-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "136185",
      externalLink: "https://www.themoviedb.org/tv/1992/season/2/episode/1",
    },
  ],
  title: "The Pirates of Orion",
  episodeType: "standard",
  stillPath: "/rybBdIldd0XRi98M9RRWHlj5Ewk.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T16:30:51.888Z",
  updatedAt: "2026-10-29T16:30:51.888Z",
} as const satisfies Episode
