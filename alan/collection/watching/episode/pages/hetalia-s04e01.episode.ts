import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e01 = {
  id: "01a183d7-7ce5-7987-9851-f5d4a4946397",
  type: "page-type/episode",
  slug: "hetalia-s04e01",
  description:
    "Japan explains the true nature of a ninja's shuriken. Wartime leaves the Axis with a lack of coffee, and Germany is assigned to come up with an alternative. Italy shows off his new tanks, which prove to be quite dangerous.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 1,
  publishedAt: "2013-01-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826964",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/1",
    },
  ],
  title: "Each Battlefield",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
