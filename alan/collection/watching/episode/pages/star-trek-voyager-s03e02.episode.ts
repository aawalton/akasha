import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e02 = {
  id: "01a18853-ac8b-75d3-9a6a-3cac68d5b113",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e02",
  description:
    "Stardate: 50126.4. After falling ill to what appears to be a repressed memory Tuvok must perform a mind-meld with Captain Janeway in order to survive. The meld takes them back to when Tuvok was a junior science officer aboard the U.S.S. Excelsior under the command of Captain Hikaru Sulu.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 2,
  publishedAt: "1996-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113071",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/2",
    },
  ],
  title: "Flashback",
  episodeType: "standard",
  stillPath: "/7F3UdecmHxTeBSjNZ1roMNKIBqt.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
