import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e01 = {
  id: "01a1884a-e0f2-796a-b84b-9b30bf6fcff7",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e01",
  description:
    "Gravely injured and unable to communicate with the team in the U.S., Callen, Sam and Kensi, with an unconscious Deeks in tow, search for a safe way home as a cartel boss places a “dead or alive” bounty on their heads. Also, Mosely and retired Navy Admiral Hollace Kilbride beseech their contacts in Mexico and D.C. for assistance with their missing colleagues",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 1,
  publishedAt: "2018-09-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1556972",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/1",
    },
  ],
  title: "To Live and Die in Mexico",
  episodeType: "standard",
  stillPath: "/mixm9ITpkIynWi8aPd76DPSSA09.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
