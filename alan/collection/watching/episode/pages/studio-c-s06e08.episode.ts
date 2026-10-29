import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS06e08 = {
  id: "01a18885-00fc-7286-8bcf-b0e806aafabf",
  type: "page-type/episode",
  slug: "studio-c-s06e08",
  description:
    "Matt reveals his favorite TV show to Stephen, poker players face off again at the world championship, and George Lucas shares his final wishes.",
  ownLength: 26,
  ownProgress: 26,
  partOfCollections: ["season/studio-c-season-6"],
  position: 8,
  publishedAt: "2015-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2855494",
      externalLink: "https://www.themoviedb.org/tv/68207/season/6/episode/8",
    },
  ],
  title: "Season 6 Episode 8",
  episodeType: "standard",
  stillPath: "/6GNh3KHSblInymyOzwEPEaoxAvr.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
