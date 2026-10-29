import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekProdigyS01e03 = {
  id: "01a18853-1b88-7f14-9047-fbb9b067cd01",
  type: "page-type/episode",
  slug: "star-trek-prodigy-s01e03",
  description:
    "Even with the guidance of their hologram advisor Janeway, the crew of The Protostar is tested when their ship is on a dangerous cosmic collision course.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-prodigy-season-1"],
  position: 3,
  publishedAt: "2021-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3310786",
      externalLink: "https://www.themoviedb.org/tv/106393/season/1/episode/3",
    },
  ],
  title: "Starstruck",
  episodeType: "standard",
  stillPath: "/blttdkWf39NufbZt6ZgYI67XgZG.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:41:50.343Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Episode
