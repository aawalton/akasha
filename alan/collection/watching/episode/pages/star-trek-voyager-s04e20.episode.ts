import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e20 = {
  id: "01a18853-ac8e-7d41-8e29-780404ad94bc",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e20",
  description:
    "Stardate: 51762.4. An alien test pilot who has the capability of switching bodies manages to take Tom's place aboard Voyager in order to escape the law.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 20,
  publishedAt: "1998-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113180",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/20",
    },
  ],
  title: "Vis à Vis",
  episodeType: "standard",
  stillPath: "/gzFi1JH7cXouGSzXPgrIPDvCTrU.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
