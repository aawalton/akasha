import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e15 = {
  id: "01a18853-ac8e-719a-bfdf-0ac613d440fe",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e15",
  description:
    "Stardate: 51501.4. As letters from the Alpha Quadrant come trickling through the communications array, the Voyager crew learns of an assortment of joyous, disturbing, and inevitable news.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 15,
  publishedAt: "1998-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113176",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/15",
    },
  ],
  title: "Hunters",
  episodeType: "standard",
  stillPath: "/7d31I6y4zyUiiyUG5dEvsNy9WSA.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
