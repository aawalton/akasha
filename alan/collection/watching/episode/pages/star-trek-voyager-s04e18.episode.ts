import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e18 = {
  id: "01a18853-ac8e-7fc4-9ed6-08fdb646fcb7",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e18",
  description:
    "Stardate: Unknown. After having taken over Voyager, the Hirogen supply the crew members with artificial identities and subject them to violent holodeck simulations.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 18,
  publishedAt: "1998-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113179",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/18",
    },
  ],
  title: "The Killing Game (1)",
  episodeType: "standard",
  stillPath: "/pfOnJUlvz9R1s1MlOedIZbRel4E.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
