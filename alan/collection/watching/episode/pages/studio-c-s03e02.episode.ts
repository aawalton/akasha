import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e02 = {
  id: "01a18885-00f9-7cff-bf33-84fb8b8fa33f",
  type: "page-type/episode",
  slug: "studio-c-s03e02",
  description:
    "Matt's parents invested ALL of his inheritance, a hungry friend gets emotional after losing something very dear to him at a funeral, and more.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-3"],
  position: 2,
  publishedAt: "2013-10-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580137",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/2",
    },
  ],
  title: "Season 3 Episode 2",
  episodeType: "standard",
  stillPath: "/1fGZF205pSTafHUftxT0LvWzSqo.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
