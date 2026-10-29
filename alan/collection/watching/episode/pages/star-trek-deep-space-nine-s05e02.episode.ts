import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekDeepSpaceNineS05e02 = {
  id: "01a18852-7715-778b-b459-19b550b91754",
  type: "page-type/episode",
  slug: "star-trek-deep-space-nine-s05e02",
  description:
    "Stardate: 50049.3. The crew find a crashed Jem’Hadar ship and work to repair it and capture it for the Federation, but are confronted by a Dominion force determined to recover the ship’s cargo.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-deep-space-nine-season-5"],
  position: 2,
  publishedAt: "1996-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005803",
      externalLink: "https://www.themoviedb.org/tv/580/season/5/episode/2",
    },
  ],
  title: "The Ship",
  episodeType: "standard",
  stillPath: "/tIiRTJqqpYf06vIvRU4ojgt98Vi.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:41:08.240Z",
  updatedAt: "2026-10-29T15:41:08.240Z",
} as const satisfies Episode
