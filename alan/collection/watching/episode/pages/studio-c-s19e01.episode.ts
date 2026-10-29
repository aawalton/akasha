import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS19e01 = {
  id: "01a18855-c2a0-7669-8140-5416e90b65f6",
  type: "page-type/episode",
  slug: "studio-c-s19e01",
  description:
    "An adventure with vampires, airplanes, parking garages, puppuccinos, and a singing bass.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-19"],
  position: 1,
  publishedAt: "2024-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5678547",
      externalLink: "https://www.themoviedb.org/tv/68207/season/19/episode/1",
    },
  ],
  title: "Help! I Can't Get Out!",
  episodeType: "standard",
  stillPath: "/bKV4gzfXyRsVtbLLdOvjapFirAa.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
