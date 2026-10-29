import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS04e05 = {
  id: "01a18880-75e9-7ab1-9612-68374ca807dc",
  type: "page-type/episode",
  slug: "the-mentalist-s04e05",
  description:
    "The CBI team investigates the murder of a woman whose corpse washed up on an island off the coast of California. Rigsby worries that his relationship with a public defender will create awkwardness between him and Van Pelt.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/the-mentalist-season-4"],
  position: 5,
  publishedAt: "2011-10-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367769",
      externalLink: "https://www.themoviedb.org/tv/5920/season/4/episode/5",
    },
  ],
  title: "Blood and Sand",
  episodeType: "standard",
  stillPath: "/bI6KnDMRKaLwJoU5zxQm0ErLtfB.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
