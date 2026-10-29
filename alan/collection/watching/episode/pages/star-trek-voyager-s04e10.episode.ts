import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e10 = {
  id: "01a18853-ac8d-74ca-ac16-099f50b0c774",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e10",
  description:
    "Stardate: 51367.2. After making contact with a race of telepaths, the Voyager crew must help defuse a volatile situation when a local citizen acts on a random, violent thought inadvertently tranferred from Torres.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 10,
  publishedAt: "1997-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113167",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/10",
    },
  ],
  title: "Random Thoughts",
  episodeType: "standard",
  stillPath: "/5pTKI9kMw3LKyEbIxbTuDXLPFSo.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
