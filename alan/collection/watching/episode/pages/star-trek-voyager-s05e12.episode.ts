import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e12 = {
  id: "01a18853-ac8f-7412-a0b3-9e7dc1d3a411",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e12",
  description:
    "Stardate: Unknown. Trans-dimensional photonic lifeforms become entangled in a war with the characters from Tom Paris' \"Captain Proton\" program after mistaking Voyager's holodeck for reality.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 12,
  publishedAt: "1999-01-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113219",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/12",
    },
  ],
  title: "Bride of Chaotica!",
  episodeType: "standard",
  stillPath: "/mihHCXvXbvUaLXfMg4tNFlVV5YV.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
