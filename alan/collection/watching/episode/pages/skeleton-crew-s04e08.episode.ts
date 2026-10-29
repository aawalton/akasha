import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS04e08 = {
  id: "01a18852-196b-794c-b159-a280502a89ec",
  type: "page-type/episode",
  slug: "skeleton-crew-s04e08",
  description:
    "Hunter, Anthony, and Appolina are trapped--but is there a way out of The Huxley Proxy?",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-4"],
  position: 8,
  publishedAt: "2019-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380512",
      externalLink: "https://www.themoviedb.org/tv/225011/season/4/episode/8",
    },
  ],
  title: "The Huxley Proxy, Part 2",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
