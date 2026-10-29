import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS05e07 = {
  id: "01a18853-ac8f-77f4-9b07-45b67311134a",
  type: "page-type/episode",
  slug: "star-trek-voyager-s05e07",
  description:
    "Stardate: Unknown. A transmission emanating from surviving technology from a destroyed Borg vessel induces multiple personality disorder in Seven of Nine.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-5"],
  position: 7,
  publishedAt: "1998-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113210",
      externalLink: "https://www.themoviedb.org/tv/1855/season/5/episode/7",
    },
  ],
  title: "Infinite Regress",
  episodeType: "standard",
  stillPath: "/lyczoIqoKrwtat8R4KZtv2XwBQl.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
