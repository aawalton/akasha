import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e11 = {
  id: "01a18853-ac8d-7ae4-90ce-8bd7adae427d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e11",
  description:
    "Stardate: 51386.4. Janeway and the hologram of Leonardo da Vinci must work together to retrieve Voyager's main computer processor, which has been stolen by alien thieves.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 11,
  publishedAt: "1997-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113168",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/11",
    },
  ],
  title: "Concerning Flight",
  episodeType: "standard",
  stillPath: "/ur4p3pHZlfvlKHz5MqBXt3gifew.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
