import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e03 = {
  id: "01a18853-ac8c-76c5-9967-ebfaff19bf62",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e03",
  description:
    "Stardate: 50156.2. Paris and Kim are sent to an Akritian prison after being accused of a terrorist bombing.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 3,
  publishedAt: "1996-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113085",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/3",
    },
  ],
  title: "The Chute",
  episodeType: "standard",
  stillPath: "/b0ekrTLBytNLjOXluUMDdvx6rkZ.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
