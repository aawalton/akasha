import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e26 = {
  id: "01a18853-ac8d-72ed-872c-72a70c42a92a",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e26",
  description:
    "Stardate: 50984.3. Voyager finally enters Borg space, only to discover a threat more powerful than the Borg themselves.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 26,
  publishedAt: "1997-05-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113156",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/26",
    },
  ],
  title: "Scorpion (1)",
  episodeType: "finale",
  stillPath: "/oXPk3t7DlJdJDGKYMSN88bnHB0b.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
