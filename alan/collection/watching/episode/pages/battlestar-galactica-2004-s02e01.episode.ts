import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica2004S02e01 = {
  id: "01a18843-80e7-7c1d-9def-f31d6bcf919b",
  type: "page-type/episode",
  slug: "battlestar-galactica-2004-s02e01",
  description:
    "With Adama out of action, Colonel Tigh takes his position as commander of the Galactica. Boomer is in jail, and the cat's out of the bag - she's a Cylon.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-2004-season-2"],
  position: 1,
  publishedAt: "2005-07-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "134133",
      externalLink: "https://www.themoviedb.org/tv/1972/season/2/episode/1",
    },
  ],
  title: "Scattered",
  episodeType: "standard",
  stillPath: "/vQttLi1KPXju9FICRfN0mr0LQL8.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Episode
