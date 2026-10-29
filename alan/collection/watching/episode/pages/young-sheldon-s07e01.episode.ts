import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS07e01 = {
  id: "01a1885a-2530-7323-9ea4-29d06469b2c3",
  type: "page-type/episode",
  slug: "young-sheldon-s07e01",
  description:
    "News of the tornado reaches Sheldon and Mary in Germany. Also, with the Cooper house in chaos, Missy steps up.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-7"],
  position: 1,
  publishedAt: "2024-02-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4918891",
      externalLink: "https://www.themoviedb.org/tv/71728/season/7/episode/1",
    },
  ],
  title: "A Wiener Schnitzel and Underwear in a Tree",
  episodeType: "standard",
  stillPath: "/fCObRwiNvfXURuHKUSYORyzNsgc.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
