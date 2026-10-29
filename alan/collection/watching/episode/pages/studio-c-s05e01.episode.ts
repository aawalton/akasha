import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS05e01 = {
  id: "01a18885-00fb-7c83-9da1-88bf18baa950",
  type: "page-type/episode",
  slug: "studio-c-s05e01",
  description:
    "The whole cast welcomes you to Season 5 of Studio C, Matt finds a new world in his couch, and James's friends try to explain how to walk properly.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-5"],
  position: 1,
  publishedAt: "2014-10-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5574631",
      externalLink: "https://www.themoviedb.org/tv/68207/season/5/episode/1",
    },
  ],
  title: "Season 5 Episode 1",
  episodeType: "standard",
  stillPath: "/2iCak2k7IBonzoiOCcmlNTfq4SN.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
