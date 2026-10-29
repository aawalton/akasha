import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS06e25 = {
  id: "01a18853-ac91-7379-8c4e-013323f33384",
  type: "page-type/episode",
  slug: "star-trek-voyager-s06e25",
  description:
    "Stardate: Unknown. When Voyager encounters some engineering problems, Neelix keeps the Borg children entertained by telling the story of an adventure that the crew experienced several months ago, with the ghost that lives on deck twelve.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-6"],
  position: 25,
  publishedAt: "2000-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113361",
      externalLink: "https://www.themoviedb.org/tv/1855/season/6/episode/25",
    },
  ],
  title: "The Haunting of Deck Twelve",
  episodeType: "standard",
  stillPath: "/a0J3vvh17tcspDys9SkiFvtJWFr.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
