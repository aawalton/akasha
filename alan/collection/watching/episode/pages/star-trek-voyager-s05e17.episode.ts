import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e17 = {
  id: "01a18853-ac8f-786c-af9d-8198804c5a9c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e17",
  description:
    "Stardate: Unknown. The entire ship and crew begin to disintegrate, leading to a discovery that they aren't what they seem.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 17,
  publishedAt: "1999-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113242",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/17",
    },
  ],
  title: "Course: Oblivion",
  episodeType: "standard",
  stillPath: "/669csmSVzX0XrBMSduBakElCv0F.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
