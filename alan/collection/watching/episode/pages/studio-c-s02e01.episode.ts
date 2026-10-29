import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS02e01 = {
  id: "01a18885-00f8-7155-a23e-43771bd5a80c",
  type: "page-type/episode",
  slug: "studio-c-s02e01",
  description:
    "Mr. Eckelstone teaches kids how to drive, Downton proves to be full of drama, and breaking up becomes more difficult than one might think.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/studio-c-season-2"],
  position: 1,
  publishedAt: "2013-04-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1383556",
      externalLink: "https://www.themoviedb.org/tv/68207/season/2/episode/1",
    },
  ],
  title: "Season 2 Episode 1",
  episodeType: "standard",
  stillPath: "/diafqoTt4ht44AXXVMexY8Xwn77.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T16:36:20.344Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Episode
