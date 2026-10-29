import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theSarahJaneAdventuresS04e05 = {
  id: "01a18858-1d5e-714d-b687-7a5206f4bacb",
  type: "page-type/episode",
  slug: "the-sarah-jane-adventures-s04e05",
  description:
    "Old Companions Sarah Jane Smith and Jo Grant meet for the first time to discover the truth when the Doctor is declared dead. An interstellar conspiracy gathers around UNIT Head Quarters as Clyde finds that he holds the fate of the Time Lord in his hand.",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["season/the-sarah-jane-adventures-season-4"],
  position: 5,
  publishedAt: "2010-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "12019",
      externalLink: "https://www.themoviedb.org/tv/203/season/4/episode/5",
    },
  ],
  title: "Death of the Doctor (1)",
  episodeType: "standard",
  stillPath: "/pV3yfCEzgDwaR3VLtrh11Fsbrap.jpg",
  voteAverage: 9.5,
  createdAt: "2026-10-29T15:47:18.491Z",
  updatedAt: "2026-10-29T15:47:18.491Z",
} as const satisfies Episode
