import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const downtonAbbeyS04e01 = {
  id: "01a18847-e986-7ac7-9bf4-f46ac13e3906",
  type: "page-type/episode",
  slug: "downton-abbey-s04e01",
  description:
    "New mother Mary is finding it hard to come to terms with Matthew's shocking death. Robert and Violet fall out over how to handle the situation. Jimmy takes an interest in Ivy, while Carson receives an unwelcome reminder from his past.",
  ownLength: 69,
  ownProgress: 0,
  partOfCollections: ["season/downton-abbey-season-4"],
  position: 1,
  publishedAt: "2013-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "779858",
      externalLink: "https://www.themoviedb.org/tv/33907/season/4/episode/1",
    },
  ],
  title: "Episode 1",
  episodeType: "standard",
  stillPath: "/9JBYjIsywB9WlH5BEK5ubuYCgsx.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:29:36.644Z",
  updatedAt: "2026-10-29T15:29:36.644Z",
} as const satisfies Episode
