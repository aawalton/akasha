import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e25 = {
  id: "01a1887f-e187-79a7-b271-439a13e26c8b",
  type: "page-type/episode",
  slug: "star-trek-2-s01e25",
  description:
    "Kirk investigates a series of grisly murders on a mining planet that are the work of a seemingly hostile alien creature.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 25,
  publishedAt: "1967-03-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13978",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/25",
    },
  ],
  title: "The Devil in the Dark",
  episodeType: "standard",
  stillPath: "/tIXgTUgYgWsnvK1ljK04FfPoYyB.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
