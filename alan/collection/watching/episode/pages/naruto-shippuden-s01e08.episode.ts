import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e08 = {
  id: "01a183d2-3bd4-7a1f-a94d-9657c8259d0c",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e08",
  description:
    "An urgent message from the Sand Village detailing the Akatsuki’s kidnapping of the Kazekage reaches the Hidden Leaf Village. Tsunade wastes no time in ordering Team Kakashi to the Sand Village.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 8,
  publishedAt: "2007-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761479",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/8",
    },
  ],
  title: "Team Kakashi, Deployed",
  episodeType: "standard",
  stillPath: "/uiDIPjTcLNj3ymGO1Z1YkXAtzhi.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
