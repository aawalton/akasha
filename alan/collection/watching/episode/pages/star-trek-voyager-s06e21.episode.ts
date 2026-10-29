import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e21 = {
  id: "01a18853-ac91-70fa-bbf2-801f8ece5de0",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e21",
  description:
    "Stardate: Unknown. A group of con artists impersonate Captain Janeway and the crew of Voyager. The crew must find the imposters soon, or they, themselves will be punished for the con artists' crimes.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 21,
  publishedAt: "2000-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113355",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/21",
    },
  ],
  title: "Live Fast and Prosper",
  episodeType: "standard",
  stillPath: "/xcCKowtXm0r4yzVuKnRkhustGYT.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
