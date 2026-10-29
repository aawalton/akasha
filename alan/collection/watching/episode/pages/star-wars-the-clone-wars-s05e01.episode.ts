import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsTheCloneWarsS05e01 = {
  id: "01a18854-50ac-70bd-bc09-a61ead8b283b",
  type: "page-type/episode",
  slug: "star-wars-the-clone-wars-s05e01",
  description:
    "Fueled by vengeance and rage, the newly reunited brothers Savage Opress and Darth Maul spread terror and violence across the galaxy. As the Sith brothers forcibly recruit Hondo Ohnaka and his pirates, Obi-Wan Kenobi and Adi Gallia chase them down, leading to a deadly confrontation.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-the-clone-wars-season-5"],
  position: 1,
  publishedAt: "2012-09-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010340",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/1",
    },
  ],
  title: "Revival",
  episodeType: "standard",
  stillPath: "/2kFHdybZdzaH0bBXnBdRInSrzNF.jpg",
  voteAverage: 9,
  createdAt: "2026-10-29T15:43:09.479Z",
  updatedAt: "2026-10-29T15:43:09.479Z",
} as const satisfies Episode
