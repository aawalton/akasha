import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS04e06 = {
  id: "01a18885-00fa-760b-831c-d810cff74072",
  type: "page-type/episode",
  slug: "studio-c-s04e06",
  description:
    "The newest Star Wars production runs into a couple bumps, Leo the Kiosk Salesman proves inescapable, and the male mind proves to be a little more divided than previously imagined.",
  ownLength: 24,
  ownProgress: 24,
  partOfCollections: ["season/studio-c-season-4"],
  position: 6,
  publishedAt: "2014-05-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3721790",
      externalLink: "https://www.themoviedb.org/tv/68207/season/4/episode/6",
    },
  ],
  title: "Season 4 Episode 6",
  episodeType: "standard",
  stillPath: "/capIlDKl5ROR5p8gqvBMlslzc8V.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
