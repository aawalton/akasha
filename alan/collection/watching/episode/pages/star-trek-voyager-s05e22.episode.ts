import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e22 = {
  id: "01a18853-ac90-751e-876c-59ab43076c96",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e22",
  description:
    "Stardate: Unknown. Captain Janeway relates the story of her distant ancestor Shannon O'Donnell during the construction of the Millennium Gate on Earth during New Year's Eve 1999. She must convince the last holdout, local bookstore owner Henry Janeway to approve the plan.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 22,
  publishedAt: "1999-05-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113270",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/22",
    },
  ],
  title: "11:59",
  episodeType: "standard",
  stillPath: "/51wDNVETr4G02dQjaSSJZm5HwDM.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
