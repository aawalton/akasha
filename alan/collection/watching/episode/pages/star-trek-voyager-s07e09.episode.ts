import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e09 = {
  id: "01a18853-ac92-748e-b9cf-8541258a22dc",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e09",
  description:
    "Stardate: 54337.5 - Voyager answers a distress call from a Hirogen outpost – only to find carnage caused by holographic technology that Captain Janeway has given them.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 9,
  publishedAt: "2000-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466835",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/9",
    },
  ],
  title: "Flesh and Blood (1)",
  episodeType: "standard",
  stillPath: "/fHznCNMgzsrpsH1ppLjW16KSZw5.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
