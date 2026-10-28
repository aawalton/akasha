import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS03e109 = {
  id: "01a183d1-bb52-7ec7-a097-e5118f751d15",
  type: "page-type/episode",
  slug: "naruto-s03e109",
  description:
    "Sasuke takes on all four Sound Ninja, but soon learns it's going to take more than Chidori to defeat them!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-3"],
  position: 109,
  publishedAt: "2004-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908086",
      externalLink: "https://www.themoviedb.org/tv/46260/season/3/episode/109",
    },
  ],
  title: "An Invitation from the Sound",
  episodeType: "standard",
  stillPath: "/4Au7ez6rMrsesmGciFczzRpfrAD.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
