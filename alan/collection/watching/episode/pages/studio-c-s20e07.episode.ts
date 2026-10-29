import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS20e07 = {
  id: "01a18855-c2a0-76a5-8943-11d92aef8dae",
  type: "page-type/episode",
  slug: "studio-c-s20e07",
  description:
    "An alien. A gameshow. A waterslide. A description. A superhero. A new hire. Will Forte guest stars.",
  ownLength: 29,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-20"],
  position: 7,
  publishedAt: "2025-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6352875",
      externalLink: "https://www.themoviedb.org/tv/68207/season/20/episode/7",
    },
  ],
  title: "Ugh My Wife! with Will Forte",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
