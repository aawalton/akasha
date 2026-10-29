import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS06e05 = {
  id: "01a1884b-301d-7646-a7d0-4a1ffe343bd1",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s06e05",
  description:
    "Navy Lieutenant Max Landry asks the New Orleans field office for help when he suspects his girlfriend is a spy. Lasalle faces another devastating dead end as he searches for his brother’s last known whereabouts.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-6"],
  position: 5,
  publishedAt: "2019-10-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1961176",
      externalLink: "https://www.themoviedb.org/tv/61387/season/6/episode/5",
    },
  ],
  title: "Spies and Lies",
  episodeType: "standard",
  stillPath: "/sa7bN78g0yFVB9MBq67FCQu10xD.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
