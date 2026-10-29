import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS04e03 = {
  id: "01a18844-d7e9-78c3-9464-dc1427746d81",
  type: "page-type/episode",
  slug: "criminal-minds-s04e03",
  description:
    "Reid and Prentiss are taken hostage when they go under cover to investigate possible child abuse at an underground cult.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-4"],
  position: 3,
  publishedAt: "2008-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "282662",
      externalLink: "https://www.themoviedb.org/tv/4057/season/4/episode/3",
    },
  ],
  title: "Minimal Loss",
  episodeType: "standard",
  stillPath: "/6xfdh7wBnK4KrETcC0bKb23hJO8.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
