import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS01e25 = {
  id: "01a18884-b706-711d-bb82-70396000ef0a",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s01e25",
  description:
    "Stardate: 41986.0. A derelict satellite is found with cryonically frozen humans aboard as the USS Enterprise is sent to investigate the destruction of outposts near Romulan space.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-1"],
  position: 25,
  publishedAt: "1988-05-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37084",
      externalLink: "https://www.themoviedb.org/tv/655/season/1/episode/25",
    },
  ],
  title: "The Neutral Zone",
  episodeType: "finale",
  stillPath: "/xubo0bohwfjAVQJtmLyvjcBoIjV.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
