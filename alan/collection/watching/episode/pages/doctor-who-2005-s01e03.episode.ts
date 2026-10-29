import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S01e03 = {
  id: "01a18883-f213-730d-8c5d-6fca7cff8cfb",
  type: "page-type/episode",
  slug: "doctor-who-2005-s01e03",
  description:
    "Charles Dickens and the Doctor team up as corpses stalk the streets of Victorian Cardiff.",
  ownLength: 47,
  ownProgress: 47,
  partOfCollections: ["season/doctor-who-season-1"],
  position: 3,
  publishedAt: "2005-04-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968589",
      externalLink: "https://www.themoviedb.org/tv/57243/season/1/episode/3",
    },
  ],
  title: "The Unquiet Dead",
  episodeType: "standard",
  stillPath: "/qT2Ca5Ljlt4gigJPNrmYHMnoE7I.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
