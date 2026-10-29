import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e06 = {
  id: "01a18853-ac8f-794d-a6b3-6fa512dba9fa",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e06",
  description:
    "Stardate: Unknown. In the future, Harry Kim attempts to correct a mistake he made 15 years earlier, which had resulted in the loss of Voyager during use of experimental engine technology.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 6,
  publishedAt: "1998-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113209",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/6",
    },
  ],
  title: "Timeless",
  episodeType: "standard",
  stillPath: "/h55EBw43yucwWetaPdriR0Z76O0.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
