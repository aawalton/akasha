import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberOneMinute = {
  id: "01a14f45-023b-7b54-a05a-2984c7e3896d",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-one-minute",
  ownLength: 3.07955,
  ownProgress: 3.07955,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "completed",
  unit: "unit/minutes",
  title: "One Minute",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "oneminute|3BmGtnKgCSGYIUhmivXKWX|184773",
  song: "song/kelly-clarkson-one-minute",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 2,
      externalId: "7ACOTEPgEHeuLMxK7w56cC",
      externalLink: "https://open.spotify.com/track/7ACOTEPgEHeuLMxK7w56cC",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
