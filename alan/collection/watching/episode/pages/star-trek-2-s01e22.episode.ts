import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e22 = {
  id: "01a1887f-e187-7555-b9f7-2abc59709b57",
  type: "page-type/episode",
  slug: "star-trek-2-s01e22",
  description:
    "The Enterprise picks up a crew of genetic supermen from the 20th century... and their leader, Khan, plans to create a new empire.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 22,
  publishedAt: "1967-02-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13974",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/22",
    },
  ],
  title: "Space Seed",
  episodeType: "standard",
  stillPath: "/gOV9E9kt5rMvPSwXMWp4H6S1mah.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
