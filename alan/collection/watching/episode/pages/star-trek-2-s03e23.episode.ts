import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S03e23 = {
  id: "01a1887f-e18b-7958-a00e-c95b3ad4a77c",
  type: "page-type/episode",
  slug: "star-trek-2-s03e23",
  description:
    "Kirk, Spock and McCoy are trapped in two parts of another planet's past - a world threatened with destruction when its sun goes supernova.",
  ownLength: 51,
  ownProgress: 51,
  partOfCollections: ["season/star-trek-season-3"],
  position: 23,
  publishedAt: "1969-03-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "14024",
      externalLink: "https://www.themoviedb.org/tv/253/season/3/episode/23",
    },
  ],
  title: "All Our Yesterdays",
  episodeType: "standard",
  stillPath: "/c1JmqC0qMJFfhMJNhr3hSk8FC7l.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
