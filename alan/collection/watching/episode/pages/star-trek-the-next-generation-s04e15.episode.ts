import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e15 = {
  id: "01a18884-b70a-73e2-a016-c49bfea41c14",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e15",
  description:
    "Riker is abducted by a xenophobic race of aliens during a first contact mission. They believe the Enterprise is a scout for an invasion.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 15,
  publishedAt: "1991-02-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37119",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/15",
    },
  ],
  title: "First Contact",
  episodeType: "standard",
  stillPath: "/fppZ7lrL3BfsPIff6ICbWVoauwV.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
