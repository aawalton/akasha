import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e23 = {
  id: "01a18853-ac8d-74d0-b34b-078ee672b68b",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e23",
  description:
    "Stardate: Unknown. An alien palaeontologist discovers a common ancestral link between his people and humans. He believes that this proves that his people (the Voth) evolved on Earth and migrated to the Delta Quadrant millions of years ago, but his government is not as willing to believe his interpretation of the evidence.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 23,
  publishedAt: "1997-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113153",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/23",
    },
  ],
  title: "Distant Origin",
  episodeType: "standard",
  stillPath: "/mPY2ki7JPGxEh5g85Uo2sn2Mnxt.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
