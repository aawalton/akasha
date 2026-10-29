import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e13 = {
  id: "01a18853-ac91-7829-ba20-39c401944557",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e13",
  description:
    "Stardate: Unknown. When the Doctor's singing talents are discovered by a technologically superior race, his new found popularity makes him consider resigning his commission to stay on the alien world with his millions of adoring fans.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 13,
  publishedAt: "2000-01-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113320",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/13",
    },
  ],
  title: "Virtuoso",
  episodeType: "standard",
  stillPath: "/6ZUhtgzJruCDeBNV3CL21KxvkSQ.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
