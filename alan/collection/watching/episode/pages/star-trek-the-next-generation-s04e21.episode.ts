import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekTheNextGenerationS04e21 = {
  id: "01a18884-b70a-795c-b5a8-94e6a51b53ba",
  type: "page-type/episode",
  slug: "star-trek-the-next-generation-s04e21",
  description:
    "Stardate: 44769.2. Picard is accused of treason when an explosion aboard the Enterprise is investigated by a ruthless and paranoid Starfleet Admiral.",
  ownLength: 46,
  ownProgress: 46,
  partOfCollections: ["season/star-trek-the-next-generation-season-4"],
  position: 21,
  publishedAt: "1991-04-29",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37125",
      externalLink: "https://www.themoviedb.org/tv/655/season/4/episode/21",
    },
  ],
  title: "The Drumhead",
  episodeType: "standard",
  stillPath: "/lBWrhV1BhMhM0huyMvfQeVTsCfy.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:36:01.412Z",
  updatedAt: "2026-10-29T16:36:01.412Z",
} as const satisfies Episode
