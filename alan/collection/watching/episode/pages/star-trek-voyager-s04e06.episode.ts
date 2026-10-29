import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e06 = {
  id: "01a18853-ac8d-7bb7-b9a7-1f1d60468a4a",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e06",
  description:
    "Stardate: Unknown. Seven of Nine steals a shuttlecraft and flees Voyager in an attempt to answer a mysterious homing beacon and return to the Borg Collective.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 6,
  publishedAt: "1997-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113164",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/6",
    },
  ],
  title: "The Raven",
  episodeType: "standard",
  stillPath: "/fwcuVfaqmEsi5e1KjnjbxelcR7T.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
