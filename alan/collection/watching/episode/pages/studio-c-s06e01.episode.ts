import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS06e01 = {
  id: "01a18885-00fb-717d-b632-ff89a3205cbd",
  type: "page-type/episode",
  slug: "studio-c-s06e01",
  description:
    "The cast kicks off Season 6 with a glimpse into the future of Studio C, a couple's doctor visit takes a sudden turn when shots are administered, and a revolutionary war gentleman labors to save Lady Gordon, a fainting damsel in distress.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-6"],
  position: 1,
  publishedAt: "2015-09-07",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2855486",
      externalLink: "https://www.themoviedb.org/tv/68207/season/6/episode/1",
    },
  ],
  title: "Season 6 Episode 1",
  episodeType: "standard",
  stillPath: "/6wTyAchclLulb3y0yqZxHagme8i.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
