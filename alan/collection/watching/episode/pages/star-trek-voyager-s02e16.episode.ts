import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS02e16 = {
  id: "01a18853-ac8b-7278-a73f-8c0073f7f5dd",
  type: "page-type/episode",
  slug: "star-trek-voyager-s02e16",
  description:
    "Stardate: Unknown. In order to help out Lon Suder, a psychopath who killed a crewmember, Tuvok performs a mind meld. Soon after, he begins showing violent tendencies, which develop until he loses control.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-2"],
  position: 16,
  publishedAt: "1996-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113011",
      externalLink: "https://www.themoviedb.org/tv/1855/season/2/episode/16",
    },
  ],
  title: "Meld",
  episodeType: "standard",
  stillPath: "/5y9HHs5W1CjFou1qHWGPlnA6CrM.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
