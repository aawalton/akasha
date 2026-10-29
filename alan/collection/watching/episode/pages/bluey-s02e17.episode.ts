import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e17 = {
  id: "01a18843-d151-7dbf-a0e0-235130493081",
  type: "page-type/episode",
  slug: "bluey-s02e17",
  description:
    "Bingo and Bluey want Mum and Dad to smoochy kiss, so they set up a romantic evening for two at their fancy restaurant. Everything goes to plan until Chef Bingo's special arrives.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 17,
  publishedAt: "2020-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2204634",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/17",
    },
  ],
  title: "Fancy Restaurant",
  episodeType: "standard",
  stillPath: "/zNVFqKAc5WlwNGfxAAcTAT3aBfm.jpg",
  voteAverage: 5.4,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
