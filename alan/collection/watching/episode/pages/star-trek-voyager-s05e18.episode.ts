import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e18 = {
  id: "01a18853-ac90-7676-b4a9-08f494dc2d06",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e18",
  description:
    "Stardate: Unknown. While boxing on the holodeck, Chakotay is contacted by a telepathic species. However, prolonged communication may leave him insane or braindead.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 18,
  publishedAt: "1999-03-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113243",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/18",
    },
  ],
  title: "The Fight",
  episodeType: "standard",
  stillPath: "/pKLvuUgSMO2BLA8cd1Yp4HJu5PD.jpg",
  voteAverage: 5.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
