import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2AmericanStandardMyBlueHeaven = {
  id: "01a0abeb-2e15-76bf-bbfb-b98877a83d03",
  type: "page-type/track",
  slug: "james-taylor-2-american-standard-my-blue-heaven",
  ownLength: 2.719333333333333,
  ownProgress: 2.719333333333333,
  partOfCollections: ["release/james-taylor-2-american-standard"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Blue Heaven",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "myblueheaven|0vn7UBvSQECKJm2817Yf1P|163160",
  song: "song/james-taylor-my-blue-heaven",
  carriedBy: [
    {
      release: "release/james-taylor-2-american-standard",
      discNumber: 1,
      position: 1,
      externalId: "0DTzNcTTUZRFhJqMcBh34s",
      externalLink: "https://open.spotify.com/track/0DTzNcTTUZRFhJqMcBh34s",
    },
  ],
  createdAt: "2026-09-16T20:31:51.829Z",
  updatedAt: "2026-09-24T19:59:43.000Z",
} as const satisfies Track
