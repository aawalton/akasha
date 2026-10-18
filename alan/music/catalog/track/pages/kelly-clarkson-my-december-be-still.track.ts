import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberBeStill = {
  id: "01a14f45-023a-74e7-bfab-bf8668b08a7e",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-be-still",
  ownLength: 3.402,
  ownProgress: 3.402,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "completed",
  unit: "unit/minutes",
  title: "Be Still",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "bestill|3BmGtnKgCSGYIUhmivXKWX|204120",
  song: "song/kelly-clarkson-be-still",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 8,
      externalId: "55MtyKhso3SCzJLtDxnQKI",
      externalLink: "https://open.spotify.com/track/55MtyKhso3SCzJLtDxnQKI",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
