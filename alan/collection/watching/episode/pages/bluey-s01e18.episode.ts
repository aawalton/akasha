import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e18 = {
  id: "01a18843-d14d-73ca-93ff-d6861984c81c",
  type: "page-type/episode",
  slug: "bluey-s01e18",
  description:
    "Honey is stuck waiting for Dr Bingo's as the other, more exciting injuries get seen before her. Receptionist Bluey tells her to be patient, some of these cases are a real pickle!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 18,
  publishedAt: "2018-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593943",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/18",
    },
  ],
  title: "The Doctor",
  episodeType: "standard",
  stillPath: "/eAsVhkNZFod4j2SEoXkDA4QZQoF.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
