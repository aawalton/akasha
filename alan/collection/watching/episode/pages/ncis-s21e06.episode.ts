import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e06 = {
  id: "01a1884b-ef83-796a-beb4-324ef8673fd4",
  type: "page-type/episode",
  slug: "ncis-s21e06",
  description:
    "After discovering a Navy pilot's body riddled with unusual wounds, NCIS' investigation draws the team into the rabbit hole of UFO conspiracy theories.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 6,
  publishedAt: "2024-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5215448",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/6",
    },
  ],
  title: "Strange Invaders",
  episodeType: "standard",
  stillPath: "/cAxbnGxY4ZIDDMt8ZkYMj1YtI2j.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
