import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS03e12 = {
  id: "01a18858-1d5d-7c6b-9ac5-120e1db6e7bd",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s03e12",
  description:
    "Sarah Jane faces the battle of her life to save her son from the effects of the gift of the Blathereen. Meanwhile trapped in the school, Rani, Clyde and K-9 fight to find a way to get to the attic, where the final showdown will take place.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-3"],
  position: 12,
  publishedAt: "2009-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12018",
      externalLink: "https://www.themoviedb.org/tv/203/season/3/episode/12",
    },
  ],
  title: "The Gift (2)",
  episodeType: "finale",
  stillPath: "/duE81lRerbliZRABKBUbHXWncUI.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
