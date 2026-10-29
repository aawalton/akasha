import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const echoS01e01 = {
  id: "01a18848-0cdb-74eb-ba4f-d4c8a6aa77c4",
  type: "page-type/episode",
  slug: "echo-s01e01",
  description:
    "After her mother's tragic death, young Maya is forced to leave her hometown of Tamaha, Oklahoma, and move to New York City where she meets Wilson Fisk, aka Kingpin, who raises her to be a ruthless assassin. After learning that Fisk had her father killed, Maya kills Kingpin and flees NYC.",
  ownLength: 51,
  ownProgress: 0,
  partOfCollections: ["season/echo-miniseries"],
  position: 1,
  publishedAt: "2024-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2843709",
      externalLink: "https://www.themoviedb.org/tv/122226/season/1/episode/1",
    },
  ],
  title: "Chafa",
  episodeType: "standard",
  stillPath: "/edI9rBakjdCoKfV1SxnXcfxrBRe.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:29:45.691Z",
  updatedAt: "2026-10-29T15:29:45.691Z",
} as const satisfies Episode
