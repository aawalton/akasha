import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e03 = {
  id: "01a18853-ac90-7171-9abe-1dd11d845047",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e03",
  description:
    "Stardate: Unknown. A near-death experience sends Torres into the apparent Klingon afterlife, and leaves her searching for answers when she returns.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 3,
  publishedAt: "1999-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113296",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/3",
    },
  ],
  title: "Barge of the Dead",
  episodeType: "standard",
  stillPath: "/dZcy1pemcR6uKeITyPQqbru1Ex9.jpg",
  voteAverage: 6.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
