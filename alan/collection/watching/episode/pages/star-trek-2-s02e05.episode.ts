import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrek2S02e05 = {
  id: "01a1887f-e188-743a-866b-a4104d33f9ca",
  type: "page-type/episode",
  slug: "star-trek-2-s02e05",
  description:
    "The crew of the Enterprise visits a mysterious paradisical planet controlled by a computer that is served by the local inhabitants.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/star-trek-season-2"],
  position: 5,
  publishedAt: "1967-10-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "13997",
      externalLink: "https://www.themoviedb.org/tv/253/season/2/episode/5",
    },
  ],
  title: "The Apple",
  episodeType: "standard",
  stillPath: "/vu8SRFewgatgnWTND7rF7ztpsbD.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:30:44.613Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Episode
