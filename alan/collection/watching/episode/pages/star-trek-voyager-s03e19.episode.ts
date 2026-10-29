import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e19 = {
  id: "01a18853-ac8c-74e7-9990-eeeea9fa5b3b",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e19",
  description:
    "Stardate: Unknown. Neelix is pushed to the limits when Tuvok's attitude becomes too much to bear while the pair is on an away mission to help evacuate a Nezu planet, which is being bombarded with asteroids.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 19,
  publishedAt: "1997-02-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113135",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/19",
    },
  ],
  title: "Rise",
  episodeType: "standard",
  stillPath: "/kMrQm5OeWUG6DayaCb363TiEuDo.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
