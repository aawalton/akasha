import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e07 = {
  id: "01a18853-1b88-777c-9b9f-ddcad0d38dcb",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e07",
  description:
    "When a mentor from Dal’s past persuades him to use their Federation cover for personal gain, they quickly discover Starfleet has protocols for a reason.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 7,
  publishedAt: "2022-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3435925",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/7",
    },
  ],
  title: "First Con-tact",
  episodeType: "standard",
  stillPath: "/MOLS2qdbRtw0TkcWk4FbJJs21n.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
