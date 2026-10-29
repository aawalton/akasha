import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS06e01 = {
  id: "01a18880-75eb-7cc0-8461-5c858305122a",
  type: "page-type/episode",
  slug: "the-mentalist-s06e01",
  description:
    "Jane and Lisbon secretly continue their mission to narrow down the list of seven Red John suspects as they investigate the murder of a man who was missing for two years.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-6"],
  position: 1,
  publishedAt: "2013-09-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367809",
      externalLink: "https://www.themoviedb.org/tv/5920/season/6/episode/1",
    },
  ],
  title: "The Desert Rose",
  episodeType: "standard",
  stillPath: "/5efUFODn9m08Bye4i3KvKrt79Jp.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
