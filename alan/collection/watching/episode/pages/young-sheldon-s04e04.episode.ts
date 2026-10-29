import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS04e04 = {
  id: "01a1885a-252d-768a-b304-34dadf5e9f56",
  type: "page-type/episode",
  slug: "young-sheldon-s04e04",
  description:
    "When their mothers force them to attend Vacation Bible School. Also, George is furious after Georgie makes a questionable purchase.",
  ownLength: 18,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-4"],
  position: 4,
  publishedAt: "2020-12-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2528736",
      externalLink: "https://www.themoviedb.org/tv/71728/season/4/episode/4",
    },
  ],
  title: "Bible Camp and a Chariot of Love",
  episodeType: "standard",
  stillPath: "/1UND6MCKQnV8TAyUkDpnwmfNegO.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
