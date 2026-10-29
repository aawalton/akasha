import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS06e08 = {
  id: "01a18880-75eb-79ad-a692-d00b6c43aa87",
  type: "page-type/episode",
  slug: "the-mentalist-s06e08",
  description:
    "Patrick Jane finally comes face-to-face with Red John, the serial killer he’s tracked since the madman murdered his wife and daughter. For 10 years, Jane has doggedly hunted his nemesis in his search for justice.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-6"],
  position: 8,
  publishedAt: "2013-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367815",
      externalLink: "https://www.themoviedb.org/tv/5920/season/6/episode/8",
    },
  ],
  title: "Red John",
  episodeType: "standard",
  stillPath: "/6Ff9qMg56nZhjF2SwPP1g6WLQAF.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
