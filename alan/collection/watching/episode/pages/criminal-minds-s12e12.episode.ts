import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS12e12 = {
  id: "01a18844-d7f6-77a0-acb3-96b71e0d4909",
  type: "page-type/episode",
  slug: "criminal-minds-s12e12",
  description:
    "The BAU team is called in to investigate when male victims are found with no way to identify them.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-12"],
  position: 12,
  publishedAt: "2017-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1266362",
      externalLink: "https://www.themoviedb.org/tv/4057/season/12/episode/12",
    },
  ],
  title: "A Good Husband",
  episodeType: "standard",
  stillPath: "/hE0MHN0DhnmWDZ0bi3ZEeMzw9L6.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
