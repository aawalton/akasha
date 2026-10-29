import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS03e12 = {
  id: "01a18853-ac8c-7ea6-9868-2f85ec46426d",
  type: "page-type/episode",
  slug: "star-trek-voyager-s03e12",
  description:
    "Stardate: Unknown. After returning from a first contact mission, Janeway, Neelix and the Doctor must retake Voyager from an infestation of microorganisms that grow to an alarming size.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-3"],
  position: 12,
  publishedAt: "1996-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1005912",
      externalLink: "https://www.themoviedb.org/tv/1855/season/3/episode/12",
    },
  ],
  title: "Macrocosm",
  episodeType: "standard",
  stillPath: "/isaNdESodHmFBkr15HaUVrgaRYM.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
