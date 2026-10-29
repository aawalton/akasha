import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const doctorWho2005S09e09 = {
  id: "01a18883-f219-75f1-8d69-c0a6dd13e476",
  type: "page-type/episode",
  slug: "doctor-who-2005-s09e09",
  description:
    "This terrifying story is assembled from footage discovered in the wreckage of Le Verrier Space Station.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/doctor-who-season-9"],
  position: 9,
  publishedAt: "2015-11-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1096303",
      externalLink: "https://www.themoviedb.org/tv/57243/season/9/episode/9",
    },
  ],
  title: "Sleep No More",
  episodeType: "standard",
  stillPath: "/fY0WCdEyg2pAewvxkg2h6SiYVWC.jpg",
  voteAverage: 5.3,
  createdAt: "2026-10-29T16:35:10.995Z",
  updatedAt: "2026-10-29T16:35:10.995Z",
} as const satisfies Episode
