import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e04 = {
  id: "01a18853-ac90-7c7c-999e-ac5e83c106c7",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e04",
  description:
    "Stardate: Unknown. The Doctor programs himself with the ability to daydream, but quickly loses track of the line between reality and fantasy. Meanwhile, an alien attempts to spy on Voyager through the Doctor’s eyes but takes his imaginings for reality.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 4,
  publishedAt: "1999-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113298",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/4",
    },
  ],
  title: "Tinker Tenor Doctor Spy",
  episodeType: "standard",
  stillPath: "/prRjDFfIQSE4cSD5yKGnLoX3Dqp.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
