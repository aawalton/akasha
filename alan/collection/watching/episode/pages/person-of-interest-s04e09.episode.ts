import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS04e09 = {
  id: "01a18851-3df6-7fea-bc31-5f714edbff36",
  type: "page-type/episode",
  slug: "person-of-interest-s04e09",
  description:
    "Reese must save Elias from the Brotherhood. He can't get any help from Root or Shaw since Shaw's cover is blown and Root is escorting her to underground.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-4"],
  position: 9,
  publishedAt: "2014-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010720",
      externalLink: "https://www.themoviedb.org/tv/1411/season/4/episode/9",
    },
  ],
  title: "The Devil You Know",
  episodeType: "standard",
  stillPath: "/za10c9uRFoeFgRYhJZHR06A9eyR.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
