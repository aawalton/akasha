import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e23 = {
  id: "01a18853-ac8e-78f2-97a2-f45fe12b8418",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e23",
  description:
    "Stardate: Unknown. 700 years into the future the Doctor must defend the crew of Voyager and set history straight when an alien race claims that the Warship Voyager was responsible for war crimes commited against their race.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 23,
  publishedAt: "1998-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113186",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/23",
    },
  ],
  title: "Living Witness",
  episodeType: "standard",
  stillPath: "/eCyz5OH4XXHG6GGNcrcgoXcX3Oh.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
