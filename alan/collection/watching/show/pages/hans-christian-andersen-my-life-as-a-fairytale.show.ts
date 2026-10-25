import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const hansChristianAndersenMyLifeAsAFairytale = {
  id: "01a1749a-c86d-79b1-9b4d-5d7b9bb9420c",
  type: "page-type/show",
  slug: "hans-christian-andersen-my-life-as-a-fairytale",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2002-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "16606",
      externalLink: "https://www.themoviedb.org/tv/16606",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Hans_Christian_Andersen:_My_Life_as_a_Fairytale",
    },
  ],
  title: "Hans Christian Andersen: My Life as a Fairytale",
  genres: ["Family", "Sci-Fi & Fantasy"],
  imdbId: "tt0294611",
  posterPath: "/fEtZBEz8bOAQRaoqkyQRRBOp77g.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Pluto TV",
    "The Roku Channel",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Show
