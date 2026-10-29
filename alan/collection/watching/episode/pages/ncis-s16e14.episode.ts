import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e14 = {
  id: "01a1884b-ef78-76e3-b8d2-ab678be9c4b9",
  type: "page-type/episode",
  slug: "ncis-s16e14",
  description:
    "McGee reluctantly visits his high school after the unique computer password he used as a teenager is linked to the murder of a department of defense contractor. The case escalates when an intruder breaks into McGee’s home in an attempt to steal his archaic high school computer.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 14,
  publishedAt: "2019-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1687275",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/14",
    },
  ],
  title: "Once Upon a Tim",
  episodeType: "standard",
  stillPath: "/xL2lFCkXkZOhYfzXb2bdXHWKeVN.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
