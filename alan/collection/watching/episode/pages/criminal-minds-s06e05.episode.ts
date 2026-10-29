import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS06e05 = {
  id: "01a18844-d7ec-7f63-8172-2e66d1fab075",
  type: "page-type/episode",
  slug: "criminal-minds-s06e05",
  description:
    "The team pursues a serial killer targeting families in the Midwest; Morgan receives a visit from Ellie after she runs away from her foster family.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-6"],
  position: 5,
  publishedAt: "2010-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283304",
      externalLink: "https://www.themoviedb.org/tv/4057/season/6/episode/5",
    },
  ],
  title: "Safe Haven",
  episodeType: "standard",
  stillPath: "/oJYmh48vIZiC89OeEkHI6Zbmosx.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
