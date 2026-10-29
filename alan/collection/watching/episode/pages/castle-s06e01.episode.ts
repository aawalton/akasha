import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS06e01 = {
  id: "01a1887e-1e42-70f5-9162-1e88157ec864",
  type: "page-type/episode",
  slug: "castle-s06e01",
  description:
    'Last season ended with Beckett wrestling over whether to take a high-profile job in DC -- a dilemma made more complicated when Castle proposed to her. In the Season 6 Premiere of "Castle," Castle and Beckett will deal with the consequences of their decisions against the backdrop of a high-stakes investigation.',
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-6"],
  position: 1,
  publishedAt: "2013-09-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64888",
      externalLink: "https://www.themoviedb.org/tv/1419/season/6/episode/1",
    },
  ],
  title: "Valkyrie (1)",
  episodeType: "standard",
  stillPath: "/az7944yF263ok9rXU1UWC5uv9NC.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
