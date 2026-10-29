import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS13e14 = {
  id: "01a1884b-ef74-7843-80fe-fff7d3035043",
  type: "page-type/episode",
  slug: "ncis-s13e14",
  description:
    "Four deep sea divers stay inside a diving chamber with a deceased body in order to decompress. The dead body belongs to a retired Petty Officer who died in mysterious circumstances.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-13"],
  position: 14,
  publishedAt: "2016-02-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1164849",
      externalLink: "https://www.themoviedb.org/tv/4614/season/13/episode/14",
    },
  ],
  title: "Decompressed",
  episodeType: "standard",
  stillPath: "/ajc7O9K4yTJ0cepxJnKM7lN6lMw.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
