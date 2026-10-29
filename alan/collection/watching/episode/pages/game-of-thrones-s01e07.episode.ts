import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gameOfThronesS01e07 = {
  id: "01a18849-08b1-71c9-bf27-25ec573e2db6",
  type: "page-type/episode",
  slug: "game-of-thrones-s01e07",
  description:
    "Robert has been injured while hunting and is dying. Jon and the others finally take their vows to the Night's Watch. A man, sent by Robert, is captured for trying to poison Daenerys. Furious, Drogo vows to attack the Seven Kingdoms.",
  ownLength: 58,
  ownProgress: 0,
  partOfCollections: ["season/game-of-thrones-season-1"],
  position: 7,
  publishedAt: "2011-05-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "63062",
      externalLink: "https://www.themoviedb.org/tv/1399/season/1/episode/7",
    },
  ],
  title: "You Win or You Die",
  episodeType: "standard",
  stillPath: "/o6ldSDhIINGNKZR62mHf2m64dD.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:30:50.161Z",
  updatedAt: "2026-10-29T15:30:50.161Z",
} as const satisfies Episode
