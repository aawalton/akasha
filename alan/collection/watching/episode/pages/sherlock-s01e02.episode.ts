import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const sherlockS01e02 = {
  id: "01a1887f-adf0-7b0f-89ab-9ae79eadf79e",
  type: "page-type/episode",
  slug: "sherlock-s01e02",
  description:
    "A mysterious cipher is being scrawled on the walls around London. The first person to see the cipher is dead within hours of reading it. Sherlock plunges into a world of codes and symbols, consulting with London's best graffiti artists. He soon learns that the city is in the grip a gang of international smugglers, a secret society called the Black Lotus.",
  ownLength: 89,
  ownProgress: 89,
  partOfCollections: ["season/sherlock-season-1"],
  position: 2,
  publishedAt: "2010-08-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "578717",
      externalLink: "https://www.themoviedb.org/tv/19885/season/1/episode/2",
    },
  ],
  title: "The Blind Banker",
  episodeType: "standard",
  stillPath: "/cp1mf1pwb8F7NcuCJkzcfxIkZw2.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T16:30:31.407Z",
  updatedAt: "2026-10-29T16:30:31.407Z",
} as const satisfies Episode
