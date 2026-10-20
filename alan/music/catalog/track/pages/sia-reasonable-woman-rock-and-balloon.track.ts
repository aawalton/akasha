import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaReasonableWomanRockAndBalloon = {
  id: "01a15994-8c68-799a-86ca-eb624b9b8c8e",
  type: "page-type/track",
  slug: "sia-reasonable-woman-rock-and-balloon",
  ownLength: 4.002833333333333,
  ownProgress: 0,
  partOfCollections: ["release/sia-reasonable-woman"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Rock and Balloon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "rockandballoon|5WUlDfRSoLAfcVSX1WnrxN|240170",
  song: "song/sia-rock-and-balloon",
  carriedBy: [
    {
      release: "release/sia-reasonable-woman",
      discNumber: 1,
      position: 15,
      externalId: "4z6dOq7x7fLFM230ajcjss",
      externalLink: "https://open.spotify.com/track/4z6dOq7x7fLFM230ajcjss",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
