import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS03e06 = {
  id: "01a18885-00fa-72c2-b6d0-43f971dfc895",
  type: "page-type/episode",
  slug: "studio-c-s03e06",
  description:
    "A father and his hyperactive son finally discover the genie's lamp, and a restaurant offers lower-calorie options with strings attached.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-3"],
  position: 6,
  publishedAt: "2013-11-11",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5580142",
      externalLink: "https://www.themoviedb.org/tv/68207/season/3/episode/6",
    },
  ],
  title: "Season 3 Episode 6",
  episodeType: "standard",
  stillPath: "/3uomtU1CS13MlOMFD6v3zV9VY4C.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
