import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS03e11 = {
  id: "01a1885a-252c-7501-805c-bf029749c51c",
  type: "page-type/episode",
  slug: "young-sheldon-s03e11",
  description:
    "George Sr. and Connie struggle to manage the Cooper household while Mary plans Pastor Jeff’s wedding.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-3"],
  position: 11,
  publishedAt: "2020-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2039278",
      externalLink: "https://www.themoviedb.org/tv/71728/season/3/episode/11",
    },
  ],
  title: "A Live Chicken, a Fried Chicken and Holy Matrimony",
  episodeType: "standard",
  stillPath: "/idvcJdGR7JT4BxLf1XhA0R1HZMV.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
