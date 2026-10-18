import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonMyDecemberHaunted = {
  id: "01a14f45-023a-7083-a40b-6863587e73fe",
  type: "page-type/track",
  slug: "kelly-clarkson-my-december-haunted",
  ownLength: 3.3013333333333335,
  ownProgress: 3.3013333333333335,
  partOfCollections: ["release/kelly-clarkson-my-december"],
  status: "completed",
  unit: "unit/minutes",
  title: "Haunted",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "haunted|3BmGtnKgCSGYIUhmivXKWX|198080",
  song: "song/kelly-clarkson-haunted",
  carriedBy: [
    {
      release: "release/kelly-clarkson-my-december",
      discNumber: 1,
      position: 7,
      externalId: "36cGlH8HC3LGEkj0vDSA5b",
      externalLink: "https://open.spotify.com/track/36cGlH8HC3LGEkj0vDSA5b",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
