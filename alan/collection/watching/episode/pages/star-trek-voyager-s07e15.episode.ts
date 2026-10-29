import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS07e15 = {
  id: "01a18853-ac92-7fd1-8668-c7fd29ecce5c",
  type: "page-type/episode",
  slug: "star-trek-voyager-s07e15",
  description:
    "Stardate: 54553.4 - Voyager is pulled into a barren spatial void where survival is based on preying upon others.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-7"],
  position: 15,
  publishedAt: "2001-02-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4466841",
      externalLink: "https://www.themoviedb.org/tv/1855/season/7/episode/15",
    },
  ],
  title: "The Void",
  episodeType: "standard",
  stillPath: "/l7jGofZPrgupgIdcUzc1PwDQLIw.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
