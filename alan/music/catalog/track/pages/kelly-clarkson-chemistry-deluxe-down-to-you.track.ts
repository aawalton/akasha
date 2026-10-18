import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeDownToYou = {
  id: "01a14f45-022f-7b36-9726-65918909e50b",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-down-to-you",
  ownLength: 3.156816666666667,
  ownProgress: 3.156816666666667,
  partOfCollections: [
    "release/kelly-clarkson-chemistry-deluxe",
    "release/kelly-clarkson-chemistry",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "down to you",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "downtoyou|3BmGtnKgCSGYIUhmivXKWX|189409",
  song: "song/kelly-clarkson-down-to-you",
  carriedBy: [
    {
      release: "release/kelly-clarkson-chemistry",
      discNumber: 1,
      position: 5,
      externalId: "2eQHMd4pV6Tz6SeUDDI6Qu",
      externalLink: "https://open.spotify.com/track/2eQHMd4pV6Tz6SeUDDI6Qu",
    },
    {
      release: "release/kelly-clarkson-chemistry-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "6Kt1emdKOlD0JFLzQ9u0kt",
      externalLink: "https://open.spotify.com/track/6Kt1emdKOlD0JFLzQ9u0kt",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
