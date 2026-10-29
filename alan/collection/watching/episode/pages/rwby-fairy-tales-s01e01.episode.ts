import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rwbyFairyTalesS01e01 = {
  id: "01a18851-b6d8-7e43-b577-85cbc66cd052",
  type: "page-type/episode",
  slug: "rwby-fairy-tales-s01e01",
  description:
    "Grimm are walking horrors that roam the wilderness... but there are some that bring the terror closer to home.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["season/rwby-fairy-tales-season-1"],
  position: 1,
  publishedAt: "2021-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3315738",
      externalLink: "https://www.themoviedb.org/tv/137654/season/1/episode/1",
    },
  ],
  title: "The Grimm Child",
  episodeType: "standard",
  stillPath: "/8tIrtV63rMYQJFo0m4ijK2adqDM.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:19.032Z",
  updatedAt: "2026-10-29T15:40:19.032Z",
} as const satisfies Episode
