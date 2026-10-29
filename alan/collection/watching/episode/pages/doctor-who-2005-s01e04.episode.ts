import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S01e04 = {
  id: "01a18883-f213-77b7-b5a4-ca4d21d141b0",
  type: "page-type/episode",
  slug: "doctor-who-2005-s01e04",
  description:
    "Rose is taken home, but a spaceship crashes in the Thames and London is closed off... Enter the Slitheen!",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/doctor-who-season-1"],
  position: 4,
  publishedAt: "2005-04-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968590",
      externalLink: "https://www.themoviedb.org/tv/57243/season/1/episode/4",
    },
  ],
  title: "Aliens of London (1)",
  episodeType: "standard",
  stillPath: "/hGmpP763cd0ZNZ9wj42sRf1jvUi.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
