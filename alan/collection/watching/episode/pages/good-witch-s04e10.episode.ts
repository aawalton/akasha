import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const goodWitchS04e10 = {
  id: "01a18849-3529-7f12-bc49-af3b7ad3dfc6",
  type: "page-type/episode",
  slug: "good-witch-s04e10",
  description:
    "After a series of unfortunate events, Sam and Cassie have to accept that their wedding might not be as perfect as planned. In light of her almost-romance with Phil, Abigail's quest to put down roots lands her a new job-- the Mayor of Middleton.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/good-witch-season-4"],
  position: 10,
  publishedAt: "2018-07-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1507541",
      externalLink: "https://www.themoviedb.org/tv/61864/season/4/episode/10",
    },
  ],
  title: "Tossing the Bouquet",
  episodeType: "finale",
  stillPath: "/6AqEijokFjcZfwVleMtmQAyLvKp.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:01.543Z",
  updatedAt: "2026-10-29T15:31:01.543Z",
} as const satisfies Episode
