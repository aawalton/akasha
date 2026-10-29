import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e16 = {
  id: "01a1884b-ef64-7386-8904-8bcc2044f87a",
  type: "page-type/episode",
  slug: "ncis-s02e16",
  description:
    "NCIS start an investigation after Petty Officer Manda King is found dead in a bartender's bed. The suspect is the owner of a competing club where Manda's sister sings.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 16,
  publishedAt: "2005-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334511",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/16",
    },
  ],
  title: "Pop Life",
  episodeType: "standard",
  stillPath: "/uqGuvrr9wybB7drNyScSxqUcOzQ.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
