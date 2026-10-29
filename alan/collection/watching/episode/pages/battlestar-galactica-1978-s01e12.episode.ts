import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const battlestarGalactica1978S01e12 = {
  id: "01a18843-67a6-716c-8a4c-01ff7928c39e",
  type: "page-type/episode",
  slug: "battlestar-galactica-1978-s01e12",
  description:
    "A Cylon kamikaze attack leaves the Galactica burning in space, with no way to extinguish the blaze that has trapped Boomer, Athena, and Boxey except a dangerous spacewalk by Apollo and Starbuck.",
  ownLength: 47,
  ownProgress: 0,
  partOfCollections: ["season/battlestar-galactica-season-1"],
  position: 12,
  publishedAt: "1978-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "972266",
      externalLink: "https://www.themoviedb.org/tv/501/season/1/episode/12",
    },
  ],
  title: "Fire in Space",
  episodeType: "standard",
  stillPath: "/p0mhjP1V46RdKWkXuCqZtShrzsm.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:24:41.252Z",
  updatedAt: "2026-10-29T15:24:41.252Z",
} as const satisfies Episode
