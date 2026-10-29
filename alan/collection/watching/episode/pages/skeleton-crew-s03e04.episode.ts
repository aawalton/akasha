import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS03e04 = {
  id: "01a18852-196b-794d-876e-c1c1cdedc146",
  type: "page-type/episode",
  slug: "skeleton-crew-s03e04",
  description:
    "MoneyShot$ is hosting a party for the premiere of Appolina's show, Hospital of Horrors, but it's Anthony and Piper who experience horror shows of their own before the night is over.",
  ownLength: 39,
  ownProgress: 0,
  partOfCollections: ["season/skeleton-crew-season-3"],
  position: 4,
  publishedAt: "2017-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380474",
      externalLink: "https://www.themoviedb.org/tv/225011/season/3/episode/4",
    },
  ],
  title: "Our Darker Selves",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
