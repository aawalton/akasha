import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS05e04 = {
  id: "01a18844-d7eb-79a9-8136-8ffedced1e53",
  type: "page-type/episode",
  slug: "criminal-minds-s05e04",
  description:
    "A group of suspects with a pack mentality who kill for the thrill of it are the subjects of a BAU manhunt.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-5"],
  position: 4,
  publishedAt: "2009-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283231",
      externalLink: "https://www.themoviedb.org/tv/4057/season/5/episode/4",
    },
  ],
  title: "Hopeless",
  episodeType: "standard",
  stillPath: "/mHtUeDxOkmoFCy8UB8EkgXQ5xPS.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
