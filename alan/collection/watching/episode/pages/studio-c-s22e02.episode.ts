import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS22e02 = {
  id: "01a18855-c2a1-74ac-b783-be0989544e26",
  type: "page-type/episode",
  slug: "studio-c-s22e02",
  description:
    "An Alexa goes rogue during date night. Mothers show how well they know their daughters. A weight lifter needs a spotter. A complicated board game overwhelms a group of friends. All the king's horses and all the king's men are summoned.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-22"],
  position: 2,
  publishedAt: "2026-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7070759",
      externalLink: "https://www.themoviedb.org/tv/68207/season/22/episode/2",
    },
  ],
  title: "Alexa, I’ll Kill You",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
