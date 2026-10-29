import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e09 = {
  id: "01a1884b-ef73-7a89-8f4d-9cd142aa32b3",
  type: "page-type/episode",
  slug: "ncis-s13e09",
  description:
    "In order to clear his name, a Petty Officer volunteers to be court-martialed if NCIS agrees to conduct its own investigation after his murder case is dismissed due to a mishandled warrant.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 9,
  publishedAt: "2015-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1134601",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/9",
    },
  ],
  title: "Day in Court",
  episodeType: "standard",
  stillPath: "/3teMktg1TjAgVztsxNw9vlM0TRJ.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
