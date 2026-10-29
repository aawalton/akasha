import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS09e03 = {
  id: "01a18844-d7f1-7d23-91c0-5c6897e69cc7",
  type: "page-type/episode",
  slug: "criminal-minds-s09e03",
  description:
    "When a sniper strikes Dallas, the BAU investigates whether the upcoming anniversary of the Kennedy assassination is a motivating factor or if something else is driving the unsub.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-9"],
  position: 3,
  publishedAt: "2013-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283455",
      externalLink: "https://www.themoviedb.org/tv/4057/season/9/episode/3",
    },
  ],
  title: "Final Shot",
  episodeType: "standard",
  stillPath: "/rPtsEAJ3hRAVurY7qa4oNgyj7XE.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
