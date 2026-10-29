import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e13 = {
  id: "01a18853-ac8f-763d-a469-2e31ad5d0184",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e13",
  description:
    "Stardate: Unknown. Stranded on a planet with little hope for rescue, Tuvok and Paris are befriended by a woman who becomes enamored with Tuvok.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 13,
  publishedAt: "1999-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113221",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/13",
    },
  ],
  title: "Gravity",
  episodeType: "standard",
  stillPath: "/h4UVrLKNt9As55Zrzu1giiRL2Hc.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
