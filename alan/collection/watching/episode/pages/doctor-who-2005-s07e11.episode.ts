import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S07e11 = {
  id: "01a18883-f218-7a9c-8963-de452951be51",
  type: "page-type/episode",
  slug: "doctor-who-2005-s07e11",
  description:
    "Something ghastly is afoot in Victorian Yorkshire, as bodies are found with their skin a waxy, glowing red.",
  ownLength: 45,
  ownProgress: 45,
  partOfCollections: ["season/doctor-who-season-7"],
  position: 11,
  publishedAt: "2013-05-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968607",
      externalLink: "https://www.themoviedb.org/tv/57243/season/7/episode/11",
    },
  ],
  title: "The Crimson Horror",
  episodeType: "standard",
  stillPath: "/mhKYkNelmUe6VAonw2XFeL8Q9Dz.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
