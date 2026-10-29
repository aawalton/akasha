import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S01e12 = {
  id: "01a1887f-e186-7ef0-a138-a668a7c6f9d4",
  type: "page-type/episode",
  slug: "star-trek-2-s01e12",
  description:
    "Spock's court martial reveals the actions of Captain Pike on his previous visit to Talos IV, where the powerful Talosians tried to persuade Pike to breed with women provided for the purpose.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-1"],
  position: 12,
  publishedAt: "1966-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13964",
      externalLink: "https://www.themoviedb.org/tv/253/season/1/episode/12",
    },
  ],
  title: "The Menagerie (2)",
  episodeType: "standard",
  stillPath: "/62fqT7FLi4iIuF2wQv1W5iShbn3.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
