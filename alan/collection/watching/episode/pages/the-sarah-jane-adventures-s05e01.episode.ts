import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS05e01 = {
  id: "01a18858-1d5e-7787-9394-9d1a7aba622f",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s05e01",
  description:
    "Sarah Jane discovers an abandoned baby girl on her doorstep and attempts to find out who left her there. At a local nuclear power station, a beautiful woman appears out of nowhere and uses alien powers to take control of the place.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-5"],
  position: 1,
  publishedAt: "2011-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12035",
      externalLink: "https://www.themoviedb.org/tv/203/season/5/episode/1",
    },
  ],
  title: "Sky (1)",
  episodeType: "standard",
  stillPath: "/yvoYN8rWUBJmv7lR8FqcZxrXnGF.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
