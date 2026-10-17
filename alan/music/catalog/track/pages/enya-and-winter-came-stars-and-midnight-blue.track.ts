import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAndWinterCameStarsAndMidnightBlue = {
  id: "01a14a1d-db49-7749-a60f-9443024608ed",
  type: "page-type/track",
  slug: "enya-and-winter-came-stars-and-midnight-blue",
  ownLength: 3.14555,
  ownProgress: 0,
  partOfCollections: [
    "release/enya-and-winter-came",
    "release/enya-the-very-best-of-enya-deluxe-edition",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Stars and Midnight Blue",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "starsandmidnightblue|6uothxMWeLWIhsGeF7cyo4|188733",
  song: "song/enya-stars-and-midnight-blue",
  carriedBy: [
    {
      release: "release/enya-and-winter-came",
      discNumber: 1,
      position: 9,
      externalId: "45rWIZ45DIW2vDz0DorQ0p",
      externalLink: "https://open.spotify.com/track/45rWIZ45DIW2vDz0DorQ0p",
    },
    {
      release: "release/enya-the-very-best-of-enya-deluxe-edition",
      discNumber: 1,
      position: 15,
      externalId: "6Ye60nwGEy04nWyzsRKW80",
      externalLink: "https://open.spotify.com/track/6Ye60nwGEy04nWyzsRKW80",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
