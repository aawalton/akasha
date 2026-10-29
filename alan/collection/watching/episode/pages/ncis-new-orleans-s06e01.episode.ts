import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS06e01 = {
  id: "01a1884b-301d-7cc0-8a85-e2161dd8728e",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s06e01",
  description:
    "Pride must cut his vacation short when Hannah is suspended for breaking protocol during a joint investigation with the FBI.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-6"],
  position: 1,
  publishedAt: "2019-09-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1879374",
      externalLink: "https://www.themoviedb.org/tv/61387/season/6/episode/1",
    },
  ],
  title: "Judgement Call",
  episodeType: "standard",
  stillPath: "/xUc4gB6axDHXrzDd5Aw5pk94w30.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
