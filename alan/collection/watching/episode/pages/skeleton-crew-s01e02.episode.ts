import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const skeletonCrewS01e02 = {
  id: "01a18852-1969-7075-8bef-97417e2c6efa",
  type: "page-type/episode",
  slug: "skeleton-crew-s01e02",
  description:
    "The day after their disastrous Halloween party, Hunter and Anthony are left struggling to figure out the next steps in their lives. Gina looks for a way out, while Eddie is forced to deal with the consequences of his actions. Meanwhile, Veronica and Aaron try to avoid even thinking about their tragedy, focusing instead on themselves.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-skeleton-crew-season-1"],
  position: 2,
  publishedAt: "2015-11-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4380447",
      externalLink: "https://www.themoviedb.org/tv/225011/season/1/episode/2",
    },
  ],
  title: "Picking Up the Pieces",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:40:44.264Z",
  updatedAt: "2026-10-29T15:40:44.264Z",
} as const satisfies Episode
