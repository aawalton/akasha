import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS07e02 = {
  id: "01a18844-6112-76e0-b6f3-732388bf6b95",
  type: "page-type/episode",
  slug: "clone-wars-s07e02",
  description: "Anakin Skywalker, Rex and the Bad Batch make a shocking discovery in Shako Minor.",
  ownLength: 27,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-7"],
  position: 2,
  publishedAt: "2020-02-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2170499",
      externalLink: "https://www.themoviedb.org/tv/4194/season/7/episode/2",
    },
  ],
  title: "A Distant Echo",
  episodeType: "standard",
  stillPath: "/t76jgzr2eOV8aLYywKhD3HVPPX2.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
