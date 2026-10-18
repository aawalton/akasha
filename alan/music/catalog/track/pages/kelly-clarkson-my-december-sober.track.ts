import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberSober = {
  id: "01a14f45-023b-7411-ad23-6da186dddeda",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-sober",
  ownLength: 4.844,
  ownProgress: 4.844,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sober",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "sober|3BmGtnKgCSGYIUhmivXKWX|290640",
  song: "song/kelly-clarkson-sober",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 4,
      externalId: "5V3CinWTBUD3goeV816B3g",
      externalLink: "https://open.spotify.com/track/5V3CinWTBUD3goeV816B3g",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
