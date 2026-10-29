import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e24 = {
  id: "01a18853-ac90-7d32-a4d0-85c14d00321b",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e24",
  description:
    "Stardate: Unknown. After Kim beams an alien missile onboard Voyager it links up to the Doctor's systems and requests that it is allowed to complete its mission of mass destruction.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 24,
  publishedAt: "1999-05-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113284",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/24",
    },
  ],
  title: "Warhead",
  episodeType: "standard",
  stillPath: "/fSvgMnOonIEUPY30rRgXOuQRZyD.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
