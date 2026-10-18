import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberHowIFeel = {
  id: "01a14f45-023a-74b5-b612-ff925d910064",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-how-i-feel",
  ownLength: 3.6751,
  ownProgress: 3.6751,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "completed",
  unit: "unit/minutes",
  title: "How I Feel",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "howifeel|3BmGtnKgCSGYIUhmivXKWX|220506",
  song: "song/kelly-clarkson-how-i-feel",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 10,
      externalId: "7M990eDUgJeWXB0B4Us3Ai",
      externalLink: "https://open.spotify.com/track/7M990eDUgJeWXB0B4Us3Ai",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
