import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekStrangeNewWorldsS04e05 = {
  id: "01a18853-4347-726f-98a7-169539a5b3ed",
  type: "page-type/episode",
  slug: "star-trek-strange-new-worlds-s04e05",
  description:
    "A transporter accident turns everyone but Spock into puppets as pirates invade the ship.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-strange-new-worlds-season-4"],
  position: 5,
  publishedAt: "2026-08-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7193799",
      externalLink: "https://www.themoviedb.org/tv/103516/season/4/episode/5",
    },
  ],
  title: "Level-Five Transporter Accident",
  episodeType: "standard",
  stillPath: "/zRbCF9m3D2RxTQscbkKrbNeEVKr.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:00.517Z",
  updatedAt: "2026-10-29T15:42:00.517Z",
} as const satisfies Episode
