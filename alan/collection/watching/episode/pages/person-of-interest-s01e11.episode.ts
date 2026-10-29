import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS01e11 = {
  id: "01a18851-3df3-725b-938c-90a01e6d9096",
  type: "page-type/episode",
  slug: "person-of-interest-s01e11",
  description:
    "Reese is confined to a wheelchair recovering from his gunshot wound, but Finch sets him up in an apartment where he’s to keep an eye on the Super, who is their latest POI. Also, Finch approaches Carter and gives her a POI to show her what they do.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-1"],
  position: 11,
  publishedAt: "2012-01-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64065",
      externalLink: "https://www.themoviedb.org/tv/1411/season/1/episode/11",
    },
  ],
  title: "Super",
  episodeType: "standard",
  stillPath: "/65EGY5u8yw0rg0XlOqu2GwesUbS.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
