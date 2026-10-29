import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS04e11 = {
  id: "01a18885-00fb-7bd7-8312-bebd98784c2d",
  type: "page-type/episode",
  slug: "studio-c-s04e11",
  description:
    "The cast and crew of Studio C walk you through a step-by-step process for making your own sketch-comedy TV show.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-4"],
  position: 11,
  publishedAt: "2014-04-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3721798",
      externalLink: "https://www.themoviedb.org/tv/68207/season/4/episode/11",
    },
  ],
  title: "How to Make Studio C",
  episodeType: "finale",
  stillPath: "/3BiVCNdI7XRspjpEGM70QuUogxK.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
