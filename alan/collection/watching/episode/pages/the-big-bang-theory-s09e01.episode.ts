import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS09e01 = {
  id: "01a18856-4007-79ec-94db-fd935d52aa17",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s09e01",
  description:
    "After driving to Vegas to get married, Penny struggles with Leonard’s confession that he kissed another girl. Also, Sheldon doesn't know how to act after Amy pushes pause on their relationship.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-9"],
  position: 1,
  publishedAt: "2015-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1105614",
      externalLink: "https://www.themoviedb.org/tv/1418/season/9/episode/1",
    },
  ],
  title: "The Matrimonial Momentum",
  episodeType: "standard",
  stillPath: "/za6BAvh7hGFooEcANqJC5srF1FA.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
