import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekVoyagerS04e17 = {
  id: "01a18853-ac8e-720d-85b5-057c31168758",
  type: "page-type/episode",
  slug: "star-trek-voyager-s04e17",
  description:
    "Stardate: 51658.2. While re-fitting Voyager's systems with newly traded weapons, Seven of Nine claims to have been assaulted by Kovin, the weapons dealer. The Doctor soon makes a surprising discovery about the situation.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-voyager-season-4"],
  position: 17,
  publishedAt: "1998-02-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "113178",
      externalLink: "https://www.themoviedb.org/tv/1855/season/4/episode/17",
    },
  ],
  title: "Retrospect",
  episodeType: "standard",
  stillPath: "/a2ED29PiMKDxm5dfcMHME3IsriJ.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-29T15:42:27.464Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Episode
